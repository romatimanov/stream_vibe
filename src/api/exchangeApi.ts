import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const EXCHANGE_KEY = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_EXCHANGE_API_URL;

interface RatesResponse {
  rates: {
    [currency: string]: number;
  };
}

export const exchangeApi = createApi({
  reducerPath: "exchangeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getLatestRates: builder.query<RatesResponse, string>({
      query: (base = "USD") =>
        `latest.json?app_id=${EXCHANGE_KEY}&base=${base}`,
    }),
    getHistoricalRates: builder.query<
      RatesResponse,
      { date: string; base?: string }
    >({
      query: ({ date, base = "USD" }) =>
        `historical/${date}.json?app_id=${EXCHANGE_KEY}&base=${base}`,
    }),
  }),
});

export const { useGetLatestRatesQuery, useGetHistoricalRatesQuery } =
  exchangeApi;
