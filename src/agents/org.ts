export interface ToolType {
  id: string;
  name: string;
  description: string;
  instructions: string;
}

export interface AgentType {
  id: string;
  name: string;
  jobDescription: string;
  employees: AgentType[];
  tool: ToolType;
}

const ORG: AgentType = {
  id: "ceo",
  name: "David",
  jobDescription:
    "Responsible for monitoring the existing portfolio of investments, asking his employees to gather data on companies, and making decisions on whether to buy or sell stocks.",
  employees: [
    {
      id: "company-facts",
      name: "Sarah",
      jobDescription:
        "Responsible for gathering company facts, analyzing them, and presenting a final report",
      employees: [],
      tool: {
        id: "company-facts",
        name: "Company Facts",
        description:
          "The company facts tool allows the user to get information about a company. Company facts includes data like name, CIK, market cap, total employees, website URL, and more.  The company facts API provides a simple way to access the most important high-level information about a company.",
        instructions:
          "Instructions must be provided in JSON format only. They are of the following format: { 'ticker': [string, e.g. AAPL] }. ",
      },
    },
    {
      id: "income-statements",
      name: "John",
      jobDescription:
        "Responsible for gathering income statements, analyzing them, and presenting a final report",
      employees: [],
      tool: {
        id: "income-statements",
        name: "Income Statements",
        description:
          "The income statements tool allows the user to get information about a company's financial performance. Income statements include data like revenue, expenses, net income, earnings per share, and more.",
        instructions:
          "Instructions must be provided in JSON format only. They are of the following format: { 'ticker': [string, e.g. AAPL], 'period': ['annual', 'quarterly', or 'ttm'], 'limit': [an integer, number of statements to return] }. ",
      },
    },
    {
      id: "balance-sheets",
      name: "Alice",
      jobDescription:
        "Responsible for gathering balance sheets, analyzing them, and presenting a final report",
      employees: [],
      tool: {
        id: "balance-sheets",
        name: "Balance Sheets",
        description:
          "The balance sheets tool allows the user to get information about a company's financial position. Balance sheets include data like assets, liabilities, equity, and more.",
        instructions:
          "Instructions must be provided in JSON format only. They are of the following format: { 'ticker': [string, e.g. AAPL], 'period': ['annual', 'quarterly', or 'ttm'], 'limit': [an integer, number of statements to return] }. ",
      },
    },
    {
      id: "cash-flow-statements",
      name: "Tony",
      jobDescription:
        "Responsible for gathering cash flow statements, analyzing them, and presenting a final report",
      employees: [],
      tool: {
        id: "cash-flow-statements",
        name: "Cash Flow Statements",
        description:
          "The cash flow statements tool allows the user to get information about a company's cash flow. Cash flow statements include data like operating cash flow, investing cash flow, financing cash flow, and more.",
        instructions:
          "Instructions must be provided in JSON format only. They are of the following format: { 'ticker': [string, e.g. AAPL], 'period': ['annual', 'quarterly', or 'ttm'], 'limit': [an integer, number of statements to return] }. ",
      },
    },
    {
      id: "inside-trading",
      name: "Michael",
      jobDescription:
        "Responsible for gathering insider trading data, analyzing it, and presenting a final report",
      employees: [],
      tool: {
        id: "inside-trading",
        name: "Inside Trading",
        description:
          "The inside trading tool allows the user to get information about insider trading activity. Insider trading data includes information about stock purchases and sales made by company insiders.",
        instructions:
          "Instructions must be provided in JSON format only. They are of the following format: { 'ticker': [string, e.g. AAPL], 'limit': [an integer, number of transactions to return] }. ",
      },
    },
    {
      id: "metrics",
      name: "Melissa",
      jobDescription:
        "Responsible for gathering metrics data, analyzing it, and presenting a final report",
      employees: [],
      tool: {
        id: "metrics",
        name: "Metrics",
        description:
          "The metrics tool allows the user to get information about a company's historical key financial metrics. Metrics data includes data like PE ratio, EPS, ROE, and more.",
        instructions:
          "Instructions must be provided in JSON format only. They are of the following format: { 'ticker': [string, e.g. AAPL], 'period': ['annual', 'quarterly', or 'ttm'], 'limit': [an integer, number of metrics to return, 1 to return the lastest metrics] }. ",
      },
    },
    {
      id: "news",
      name: "Natasha",
      jobDescription:
        "Responsible for gathering news data, analyzing it, and presenting a final report",
      employees: [],
      tool: {
        id: "news",
        name: "News",
        description:
          "The news tool allows the user to get the latest news articles about a company. News data includes information about recent events, announcements, and developments related to the company.",
        instructions:
          "Instructions must be provided in JSON format only. They are of the following format: { 'ticker': [string, e.g. AAPL], 'limit': [an integer, number of articles to return, max is 100] }. ",
      },
    },
    {
      id: "prices",
      name: "Peter",
      jobDescription:
        "Responsible for gathering stock prices, analyzing them, and presenting a final report",
      employees: [],
      tool: {
        id: "prices",
        name: "Prices",
        description:
          "The prices tool allows the user to get information about a company's stock prices. Prices data includes data like open, close, high, low, and more.",
        instructions:
          "Instructions must be provided in JSON format only. They are of the following format: { 'ticker': [string, e.g. AAPL], 'interval': ['second', 'minute', 'day', 'week', 'month' or 'year'], 'intervalMultiplier': [integer, for exmaple 5 would be every 5 minutes if the interval was minutes], 'startDate': [format 'YYY-MM-DD'], 'endDate': [format 'YYYY-MM-DD'], 'limit': [an integer, number of prices to return, 1 for most recent price] }. ",
      },
    },
    {
      id: "segemented-revenues",
      name: "Sara",
      jobDescription:
        "Responsible for gathering segmented revenues, analyzing them, and presenting a final report",
      employees: [],
      tool: {
        id: "segemented-revenues",
        name: "Segemented Revenues",
        description:
          "The segemented revenues tool allows the user to get information about a company's revenues by segment. Segemented revenues data includes data like revenue, expenses, net income, earnings per share, and more.",
        instructions:
          "Instructions must be provided in JSON format only. They are of the following format: { 'ticker': [string, e.g. AAPL], 'period': ['annual', 'quarterly', or 'ttm'], 'limit': [an integer, number of statements to return] }. ",
      },
    },
  ],
  tool: {
    id: "exchange",
    name: "Exchange",
    description: "The exchange allows the user to buy and sell stocks.",
    instructions:
      "Instructions must be provided in JSON format only. They are of the following format: { 'action': 'buy | sell', 'ticker': 'e.g AAPL', 'amount': [the usd amount as an integer] }",
  },
};
export default ORG;
