import { AgentType } from "../agents/org";
import getBalanceSheets from "../financials/get-balance-sheets";
import getCashFlowStatements from "../financials/get-cash-flow-statements";
import getCompanyFacts from "../financials/get-company-facts";
import getIncomeStatements from "../financials/get-income-statements";
import getInsiderTrades from "../financials/get-insider-trades";
import getMetrics from "../financials/get-metrics";
import getNews from "../financials/get-news";
import getPrices from "../financials/get-prices";
import getSegmentedRevenues from "../financials/get-segmented-revenues";

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
    // Company Facts
    if (employee.tool.id === "company-facts") {
      const ticker = toolData.ticker;
      if (!ticker) {
        console.log(toolData);
        throw new Error("No ticker in tool data");
      }
      console.log(`🚀 ${employee.name} is getting company facts for ${ticker}`);
      const data = await getCompanyFacts(toolData.ticker);
      allToolData.push(data);
    }

    // Income Statements
    else if (employee.tool.id === "income-statements") {
      const ticker = toolData.ticker;
      const period = toolData.period;
      const limit = toolData.limit;
      if (!ticker || !period || !limit) {
        console.log(toolData);
        throw new Error("Missing data in toolData");
      }
      console.log(
        `🚀 ${employee.name} is getting income statements for ${ticker}`
      );
      const data = await getIncomeStatements(ticker, period, limit);
      allToolData.push(data);
    }

    // Income Statements
    else if (employee.tool.id === "balance-sheets") {
      const ticker = toolData.ticker;
      const period = toolData.period;
      const limit = toolData.limit;
      if (!ticker || !period || !limit) {
        console.log(toolData);
        throw new Error("Missing data in toolData");
      }
      console.log(
        `🚀 ${employee.name} is getting balance sheets for ${ticker}`
      );
      const data = await getBalanceSheets(ticker, period, limit);
      allToolData.push(data);
    }

    // Cash Flow Statements
    else if (employee.tool.id === "cash-flow-statements") {
      const ticker = toolData.ticker;
      const period = toolData.period;
      const limit = toolData.limit;
      if (!ticker || !period || !limit) {
        console.log(toolData);
        throw new Error("Missing data in toolData");
      }
      console.log(
        `🚀 ${employee.name} is getting cash flow statements for ${ticker}`
      );
      const data = await getCashFlowStatements(ticker, period, limit);
      allToolData.push(data);
    }

    // Insider Trading
    else if (employee.tool.id === "inside-trading") {
      const ticker = toolData.ticker;
      const limit = toolData.limit;
      if (!ticker || !limit) {
        console.log(toolData);
        throw new Error("Missing data in toolData");
      }
      console.log(
        `🚀 ${employee.name} is getting insider trades for ${ticker}`
      );
      const data = await getInsiderTrades(ticker, limit);
      allToolData.push(data);
    }

    // Metrics
    else if (employee.tool.id === "metrics") {
      const ticker = toolData.ticker;
      const period = toolData.period;
      const limit = toolData.limit;
      if (!ticker || !period || !limit) {
        console.log(toolData);
        throw new Error("Missing data in toolData");
      }
      console.log(`🚀 ${employee.name} is getting metrics for ${ticker}`);
      const data = await getMetrics(ticker, period, limit);
      allToolData.push(data);
    }

    // News
    else if (employee.tool.id === "news") {
      const ticker = toolData.ticker;
      const limit = toolData.limit;
      if (!ticker || !limit) {
        console.log(toolData);
        throw new Error("Missing data in toolData");
      }
      console.log(`🚀 ${employee.name} is getting news for ${ticker}`);
      const data = await getNews(ticker, limit);
      allToolData.push(data);
    }

    // Prices
    else if (employee.tool.id === "prices") {
      const ticker = toolData.ticker;
      const interval = toolData.interval;
      const intervalMultiplier = toolData.intervalMultiplier;
      const startDate = toolData.startDate;
      const endDate = toolData.endDate;
      if (
        !ticker ||
        !interval ||
        !intervalMultiplier ||
        !startDate ||
        !endDate
      ) {
        console.log(toolData);
        throw new Error("Missing data in toolData");
      }
      console.log(`🚀 ${employee.name} is getting prices for ${ticker}`);
      const data = await getPrices(
        ticker,
        interval,
        intervalMultiplier,
        startDate,
        endDate
      );
      allToolData.push(data);
    }

    // Segmented Revenues
    else if (employee.tool.id === "segemented-revenues") {
      const ticker = toolData.ticker;
      const period = toolData.period;
      const limit = toolData.limit;
      if (!ticker || !period || !limit) {
        console.log(toolData);
        throw new Error("Missing data in toolData");
      }
      console.log(
        `🚀 ${employee.name} is getting segmented revenues for ${ticker}`
      );
      const data = await getSegmentedRevenues(ticker, period, limit);
      allToolData.push(data);
    }

    // Exchange
    else if (employee.tool.id === "exchange") {
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
