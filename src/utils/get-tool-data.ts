import { AgentType } from "../agents/org";
import getCompanyFacts from "../financials/get-company-facts";

const getToolData = async (response: any, employee: AgentType) => {
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
      console.log(`🚀 ${employee.name} is getting company facts for ${ticker}`);
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

  return allToolData;
};

export default getToolData;
