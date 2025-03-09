"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY_TMDb;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const addWatchApi = createApi({
  reducerPath: "addWatchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    addWatch: builder.mutation({
      query: ({ accountId, movieId }) => ({
        url: `/3/account/${accountId}/watchlist`,
        method: "POST",
        body: {
          media_type: "movie",
          media_id: movieId,
          watchlist: true,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          accept: "application/json",
        },
      }),
    }),
  }),
});

export const { useAddWatchMutation } = addWatchApi;
