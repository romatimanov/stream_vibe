"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_API_KEY_TMDb;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface WatchList {
  id: number;
  name: string;
}

export interface WatchResponse {
  results: WatchList[];
}

export const watchListApi = createApi({
  reducerPath: "watchListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      if (!ACCESS_TOKEN) {
        console.error("Ошибка: ACCESS_TOKEN отсутствует.");
      } else {
        headers.set("Authorization", `Bearer ${ACCESS_TOKEN}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getWatchMovies: builder.query<
      WatchResponse,
      { language: string; account_id: string }
    >({
      query: ({ language, account_id }) => ({
        url: `/3/account/${account_id}/watchlist/movies`,
        params: {
          language,
        },
      }),
    }),
  }),
});

export const { useGetWatchMoviesQuery } = watchListApi;
