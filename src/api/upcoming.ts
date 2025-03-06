"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface Movie {
  id: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
}

export interface MoviesResponse {
  results: Movie[];
}

export const upcomingApi = createApi({
  reducerPath: "upcomingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/3/movie`,
  }),
  endpoints: (builder) => ({
    getUpcomingMovies: builder.query<MoviesResponse, string>({
      query: (language) => ({
        url: "/upcoming",
        params: {
          api_key: API_KEY,
          language,
          page: 2,
        },
      }),
    }),
  }),
});

export const { useGetUpcomingMoviesQuery } = upcomingApi;
