import { FIN_DATA_API } from "../app/constants";
import getFinDataOptions from "./options";

const getCashFlowStatements = async (
  ticker: string,
  period: string,
  limit: number
) => {
  const url = `${FIN_DATA_API}/financials/cash-flow-statements?ticker=${ticker}&period=${period}&limit=${limit}`;
  const response = await fetch(url, getFinDataOptions());
  return await response.json();
};

export default getCashFlowStatements;
