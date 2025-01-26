import { FIN_DATA_API } from "../app/constants";
import getFinDataOptions from "./options";

const getInsiderTrades = async (ticker: string, limit: number) => {
  const url = `${FIN_DATA_API}/insider-trades?ticker=${ticker}&limit=${limit}`;
  const response = await fetch(url, getFinDataOptions());
  return await response.json();
};

export default getInsiderTrades;
