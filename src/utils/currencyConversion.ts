import axios from "axios";

export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY;
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;

  const response = await axios.get(url);
  const data = response.data;

  if (data.result === "success") {
    return data.conversion_result;
  } else {
    throw new Error("Currency conversion failed");
  }
}


