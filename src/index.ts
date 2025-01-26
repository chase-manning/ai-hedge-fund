import dotenv from "dotenv";
import ORG, { AgentType } from "./agents/org";
import getLlmRequest from "./utils/llm-request";
import APPROVED_COMPANIES from "./app/approved-companies";
import fs from "fs";
import findEmployee from "./utils/find-employee";
import debugLog from "./utils/debug-log";
import getToolData from "./utils/get-tool-data";

dotenv.config();

const employeeRequest = async (request: string[], employee: AgentType) => {
  // If this is the first request, print the employee name
  if (request.length === 1) {
    console.log("");
    console.log(`====== ${employee.name} ======`);
  }

  // Make the request to the LLM
  const response = await getLlmRequest(request, employee);
  const status = response.status;
  if (!status) throw new Error("No status in response");

  // Handling employee requests
  if (status === "employeeRequest") {
    const allResponses = [];
    let requestDataList = response.employeeRequest;
    if (!requestDataList)
      throw new Error("No employee request data in response");
    if (!Array.isArray(requestDataList)) {
      requestDataList = [requestDataList];
    }
    for (const requestData of requestDataList) {
      const employeeId = requestData.employeeId;
      let newEmployee = findEmployee(ORG, employeeId);
      if (!newEmployee) throw new Error(`Employee ${employeeId} not found`);
      const request = requestData.request;
      console.log(`🗣️ "${newEmployee.name}, ${request}"`);
      const employeeResponse = await employeeRequest([request], newEmployee);
      allResponses.push(`${newEmployee.name} Responded: ${employeeResponse}`);
    }
    const updatedRequest = [
      ...request,
      JSON.stringify(response),
      JSON.stringify(allResponses),
    ];
    console.log("");
    console.log(`====== ${employee.name} ======`);
    return await employeeRequest(updatedRequest, employee);
  }

  // Handling tool usage
  else if (status === "useTool") {
    const allToolData = await getToolData(response, employee);
    const updatedRequest = [
      ...request,
      JSON.stringify(response),
      JSON.stringify(allToolData),
    ];
    return await employeeRequest(updatedRequest, employee);
  }

  // Handling final report
  else if (status === "provideFinalReport") {
    const report = JSON.stringify(response.report);
    console.log(`📝 Documenting findings and reporting back`);
    debugLog("Report", report);
    if (!report) throw new Error("No report in response");
    return report;
  }

  // Handling end of operations
  else if (status === "noMoreBuysOrSellsRequired") {
    console.log(`👋 ${employee.name} is clocking out`);
    return;
  }

  // Unexpected status
  else {
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
