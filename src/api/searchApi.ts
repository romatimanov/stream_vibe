"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  results: any[];
}

export interface MoviesResponse {
  results: Movie[];
}

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/3/search`,
  }),
  endpoints: (builder) => ({
    getSearchMovies: builder.query<Movie, { query: string; language: string }>({
      query: ({ query, language }) => ({
        url: "/movie",
        params: {
          api_key: API_KEY,
          query,
          language,
          adult: false,
        },
      }),
    }),
    getSearchTv: builder.query<Movie, { query: string; language: string }>({
      query: ({ query, language }) => ({
        url: "/tv",
        params: {
          api_key: API_KEY,
          query,
          language,
          adult: false,
        },
      }),
    }),
  }),
});

export const { useGetSearchMoviesQuery, useGetSearchTvQuery } = searchApi;
