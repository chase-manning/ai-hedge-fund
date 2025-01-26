import dotenv from "dotenv";
import ORG, { AgentType } from "./agents/org";
import getLlmRequest from "./utils/llm-request";
import APPROVED_COMPANIES from "./app/approved-companies";
import getCompanyFacts from "./financials/get-company-facts";
import fs from "fs";

dotenv.config();

const findEmployee = (agent: AgentType, id: string): AgentType | null => {
  if (agent.employees.length === 0) {
    if (agent.id === id) {
      return agent;
    }
    return null;
  }

  for (const employee of ORG.employees) {
    const found = findEmployee(employee, id);
    if (found) {
      return found;
    }
  }

  return null;
};

const employeeRequest = async (request: string[], employee: AgentType) => {
  if (request.length === 1) {
    console.log("");
    console.log(`====== ${employee.name} ======`);
  }
  const response = await getLlmRequest(request, employee);
  const status = response.status;
  if (!status) {
    console.log("No response from the LLM");
    return;
  }
  if (status === "employeeRequest") {
    const requestData = response.employeeRequest;
    if (!requestData) {
      console.log(response);
      throw new Error("No employee request data in response");
    }

    const employeeId = requestData.employeeId;

    let newEmployee = findEmployee(ORG, employeeId);

    if (!newEmployee) {
      throw new Error(`Employee with id ${employeeId} not found`);
    }

    const request = requestData.request;

    console.log(`🗣️ "${newEmployee.name}, ${request}"`);
    const employeeResponse = await employeeRequest([request], newEmployee);
    const updatedRequest = [
      ...request,
      JSON.stringify(response),
      JSON.stringify(`${newEmployee.name} Responded: ${employeeResponse}`),
    ];
    console.log("");
    console.log(`====== ${employee.name} ======`);
    return await employeeRequest(updatedRequest, employee);
  } else if (status === "useTool") {
    let toolDataList = response.toolData;
    if (!toolDataList) {
      console.log(response);
      throw new Error("No tool data in response");
    }
    if (!Array.isArray(toolDataList)) {
      toolDataList = [toolDataList];
    }
    const allToolData = [];
    for (const toolData of toolDataList) {
      if (employee.tool.id === "company-facts") {
        const ticker = toolData.ticker;
        if (!ticker) {
          console.log(toolData);
          throw new Error("No ticker in tool data");
        }
        console.log(
          `🚀 ${employee.name} is getting company facts for ${ticker}`
        );
        const data = await getCompanyFacts(toolData.ticker);
        allToolData.push(data);
      } else if (employee.tool.id === "exchange") {
        const action = toolData.action;
        const ticker = toolData.ticker;
        const amount = toolData.amount;
        if (!action || !ticker || !amount) {
          console.log(toolData);
          throw new Error("Missing data in toolData");
        }
        console.log(
          `🚀 ${action === "buy" ? "Buying" : "Selling"} ${amount} of ${ticker}`
        );
        allToolData.push({ action, ticker, amount });
      } else {
        throw new Error(`Unexpected tool: ${employee.tool.id}`);
      }
    }
    const updatedRequest = [
      ...request,
      JSON.stringify(response),
      JSON.stringify(allToolData),
    ];
    return await employeeRequest(updatedRequest, employee);
  } else if (status === "provideFinalReport") {
    const report = response.report;
    console.log(`📝 Documenting findings and reporting back`);
    if (!report) {
      throw new Error("No report in response");
    }

    return report;
  } else if (status === "endAllOperationsAndExitRuntimeHardTermination") {
    console.log(`👋 ${employee.name} is clocking out`);
    return;
  } else {
    throw new Error(`Unexpected status: ${status}`);
  }
};

const run = async () => {
  fs.writeFileSync("debug.txt", "");

  await employeeRequest(
    [
      `You currently don't have any investments, you have $100,000 of idle cash, please do some research and find some good assets to buy, then purchase them using your exchange tool. Then provide a final report to me of what you purchased and why. The assets you're able to invest in are: ${APPROVED_COMPANIES.join()}. You must use your 'Exchange' tool to buy stocks with the "useTool" status before you provide your final report.`,
    ],
    ORG
  );
};

run();
