"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY_TMDb;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const addFavoriteApi = createApi({
  reducerPath: "addFavoriteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    addFavorite: builder.mutation({
      query: ({ accountId, movieId, favorite }) => ({
        url: `/3/account/${accountId}/favorite`,
        method: "POST",
        body: {
          media_type: "movie",
          media_id: movieId,
          favorite,
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

export const { useAddFavoriteMutation } = addFavoriteApi;
