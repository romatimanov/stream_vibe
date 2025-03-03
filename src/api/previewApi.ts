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

export const previewApi = createApi({
  reducerPath: "previewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/3/movie`,
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MoviesResponse, string>({
      query: (language) => ({
        url: "/popular",
        params: {
          api_key: API_KEY,
          language,
          page: 1,
        },
      }),
    }),
  }),
});

export const { useGetPopularMoviesQuery } = previewApi;
