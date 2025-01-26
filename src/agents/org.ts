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
        "Responsible for gathering company facts as requested by their manager, analyzing them, and presenting a final report to their manager with possible reccomendations or analysis.",
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
