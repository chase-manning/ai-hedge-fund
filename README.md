# AI Hedge Fund

A hedge fund of AI agents that work together to gather stock data, analyse it, and execute buy and sell orders based on the results.

The agents are structured in a similar way to a traditional organisation, with many employees reporting to the CEO. Each of the employees/agents have access to a tool which they can use to query real word stock data via [Financial Datasets](https://www.financialdatasets.ai/). The agents then summarise the data and report it back to the CEO. The agents can investigate whatever data they like though their tool, the CEO can talk with any employee at any time and request anything from them. After consideration and investigation the CEO will make a decision on what stocks to buy or sell.

# Running the Agents

- Clone the repo and jump into the directory.
- Create a `.env` file in root and set `OPENAI_API_KEY` and `FINANCIAL_DATASETS_API_KEY` (from [here](https://platform.openai.com/chat-completions) and [here](https://www.financialdatasets.ai/))
- Run `yarn` to install the dependencies, and then `yarn start` to run the agents.

You can adjust your request in `src/index.ts` at the bottom to align with what request you would like to ask the AI Hedge Fund.  
You can view additional information in `debug.txt`.

# Contributions

Contributions are very welcomed, feel free to raise a PR, and for larger changes, create an issue to discuss it first so we're on the same page before implementation.
