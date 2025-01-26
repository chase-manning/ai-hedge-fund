import OpenAI from "openai";
import ORG, { AgentType } from "../agents/org";
import { ChatCompletionMessageParam } from "openai/resources";
import fs from "fs";
import debugLog from "./debug-log";

interface LlmResponse {
  status: "useTool" | "provideFinalReport" | "employeeRequest";
  internalMonologueShort: string;
  internalMonologueLong: string;
  toolData: any;
  report: any;
  employeeRequest: any;
}

const getLlmRequest = async (
  requests: string[],
  agent: AgentType
): Promise<LlmResponse> => {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  const message = `You are an employee in a hedge fund. Your name is: ${
    agent.name
  }. Your job description is: ${
    agent.jobDescription
  }. You will be given instructions from your manager. You must complete these directions. You have a tool you must use to help you. Your tool is called: ${
    agent.tool.name
  }. The description of the tool is: ${
    agent.tool.description
  }. The instructions for the tool are: ${
    agent.tool.instructions
  }. You can use your tool multiple times per request as the input for the tool data is a list. ${
    agent.employees.length > 0
      ? `You have ${
          agent.employees.length
        } employees which you can request as many things as you like from at any time.${agent.employees.map(
          (employee, index) =>
            ` ${index === 0 ? "An" : "Another"} employee of yours is: ${
              employee.name
            }, their id is: ${employee.id}, their job description is: '${
              employee.jobDescription
            }',.`
        )} The data format for making an employee request is { "employeeId", [id of employee], "request": [request as a string]}`
      : ""
  }. You must respond to all queries in JSON format only. Your response should be in this format { "status": ["useTool"${
    agent.id !== ORG.id
      ? ` | "provideFinalReport"`
      : ` | "noMoreBuysOrSellsRequired"`
  }${
    agent.employees.length > 0 ? ` | "employeeRequest"` : ""
  } ], "internalMonologueShort": [your internal monologue about what you are thinking during this. Short version, one small sentense], "internalMonologueLong": [your internal monologue about what you are thinking during this. Long version, several paragraphs], "toolData": [a list of JSON data for each use of your tool. can be left blank if you are not using your tool], "report": [your final report to pass on to your manager, can be left blank if you are using your tool or contacting an employee], "employeeRequest": [list of JSON data for requests to your employees. can be left blank if not requesting anything from your employee] }. You can take as many actions as you like, but only one at a time. After each action you will be fed the response, and then can choose another action. You may ask the same employee multiple requests, or multiple employees different requests, or use your tool as many times as you like in any order.`;
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
  debugLog("🚀", `${agent.name} is making a request to the LLM`);
  debugLog("Message", message);
  debugLog("Request", requests[requests.length - 1]);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: message,
      },
      ...requests.map((text, index) => {
        const item: ChatCompletionMessageParam = {
          role: index % 2 === 0 ? "user" : "assistant",
          content: text,
        };
        return item;
      }),
    ],
    model: "gpt-4-turbo",
    response_format: { type: "json_object" },
  });

  if (!completion.choices) {
    throw new Error("No response from the LLM");
  }

  const response = completion.choices[0].message.content;

  if (!response) {
    throw new Error("No status in response from the LLM");
  }
  debugLog("Response", response);

  const jsonData = JSON.parse(response);

  const internalMonologueShort = jsonData.internalMonologueShort;

  if (!internalMonologueShort) {
    throw new Error("No internal monologue short in response from the LLM");
  }

  console.log(`🤔 ${internalMonologueShort}`);

  return jsonData;
};

export default getLlmRequest;
