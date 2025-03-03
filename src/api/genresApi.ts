"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}

export const genresApi = createApi({
  reducerPath: "genresApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getGenresMovies: builder.query<GenresResponse, string>({
      query: (language) => ({
        url: "/3/genre/movie/list",
        params: {
          api_key: API_KEY,
          language,
        },
      }),
    }),
  }),
});

export const { useGetGenresMoviesQuery } = genresApi;
