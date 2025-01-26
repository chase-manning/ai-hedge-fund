const getFinDataOptions = () => {
  const key = process.env.FINANCIAL_DATASETS_API_KEY;
  if (!key) {
    throw new Error("FINANCIAL_DATASETS_API_KEY is not set");
  }
  const options = {
    method: "GET",
    headers: { "X-API-KEY": key },
  };
  return options;
};

export default getFinDataOptions;
