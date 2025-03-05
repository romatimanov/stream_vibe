"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export interface MoviesResponse {
  results: Movie[];
}

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/3/search/movie`,
  }),
  endpoints: (builder) => ({
    getSearchMovies: builder.query<
      MoviesResponse,
      { query: string; language: string }
    >({
      query: ({ query, language }) => ({
        url: "",
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

export const { useGetSearchMoviesQuery } = searchApi;
