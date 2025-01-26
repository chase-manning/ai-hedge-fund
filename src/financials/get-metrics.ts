import { FIN_DATA_API } from "../app/constants";
import getFinDataOptions from "./options";

const getMetrics = async (ticker: string, period: string, limit: number) => {
  const url = `${FIN_DATA_API}/financial-metrics?ticker=${ticker}&period=${period}&limit=${limit}`;
  const response = await fetch(url, getFinDataOptions());
  return await response.json();
};

export default getMetrics;
