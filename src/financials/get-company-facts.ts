import { FIN_DATA_API } from "../app/constants";
import getFinDataOptions from "./options";

const getCompanyFacts = async (ticker: string) => {
  const url = `${FIN_DATA_API}/company/facts?ticker=${ticker}`;
  const response = await fetch(url, getFinDataOptions());
  return await response.json();
};

export default getCompanyFacts;
