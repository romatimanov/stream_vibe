"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  cast: any[];
  results: any[];
  release_date: string;
  spoken_languages: { name: string }[];
  vote_average: number;
  genres: { id: number; name: string }[];
  director: { name: string }[];
  crew: any[];
  video_keys: { key: string }[];
}

export const movieDetailsApi = createApi({
  reducerPath: "movieDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/3/`,
  }),
  endpoints: (builder) => ({
    getDetailsMovies: builder.query<Movie, { id: number; language: string }>({
      query: ({ id, language }) => ({
        url: `movie/${id}`,
        params: {
          api_key: API_KEY,
          id,
          language,
        },
      }),
    }),
    getCreditsMovies: builder.query<Movie, { id: number; language: string }>({
      query: ({ id, language }) => ({
        url: `movie/${id}/credits`,
        params: {
          api_key: API_KEY,
          id,
          language,
        },
      }),
    }),
    getReviewsMovies: builder.query<Movie, { id: number; language: string }>({
      query: ({ id, language }) => ({
        url: `movie/${id}/reviews`,
        params: {
          api_key: API_KEY,
          id,
          language,
        },
      }),
    }),
    getVideoMovies: builder.query<Movie, { id: number; language: string }>({
      query: ({ id, language }) => ({
        url: `movie/${id}/videos`,
        params: {
          api_key: API_KEY,
          id,
          language,
        },
      }),
    }),
  }),
});

export const {
  useGetDetailsMoviesQuery,
  useGetCreditsMoviesQuery,
  useGetReviewsMoviesQuery,
  useGetVideoMoviesQuery,
} = movieDetailsApi;
