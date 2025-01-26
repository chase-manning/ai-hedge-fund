import { FIN_DATA_API } from "../app/constants";
import getFinDataOptions from "./options";

const getPrices = async (
  ticker: string,
  interval: string,
  intervalMultiplier: number,
  startDate: string,
  endDate: string
) => {
  const url = `${FIN_DATA_API}/prices?ticker=${ticker}&interval=${interval}&interval_multiplier=${intervalMultiplier}&start_date=${startDate}&end_date=${endDate}`;
  const response = await fetch(url, getFinDataOptions());
  return await response.json();
};

export default getPrices;
