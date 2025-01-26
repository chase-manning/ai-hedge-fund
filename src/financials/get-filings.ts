import { FIN_DATA_API } from "../app/constants";
import getFinDataOptions from "./options";

const getFilings = async (ticker: string, filingType: string, year: number) => {
  const url = `${FIN_DATA_API}/filings/items?ticker=${ticker}&filing_type=${filingType}&year=${year}`;
  const response = await fetch(url, getFinDataOptions());
  return await response.json();
};

export default getFilings;
