import { FIN_DATA_API } from "../app/constants";
import getFinDataOptions from "./options";

const getNews = async (ticker: string, limit: number) => {
  const url = `${FIN_DATA_API}/news?ticker=${ticker}&limit=${limit}`;
  const response = await fetch(url, getFinDataOptions());
  return await response.json();
};

export default getNews;
