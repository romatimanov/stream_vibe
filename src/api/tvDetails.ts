"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface Movie {
  id: number;
  title: string;
  name: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  first_air_date: string;
  cast: any[];
  results: any[];
  release_date: string;
  spoken_languages: { name: string }[];
  vote_average: number;
  genres: { id: number; name: string }[];
  director: { name: string }[];
  crew: any[];
  video_keys: { key: string }[];
  seasons: any[];
}

export const tvDetailsApi = createApi({
  reducerPath: "tvDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/3/`,
  }),
  endpoints: (builder) => ({
    getDetailsTv: builder.query<Movie, { id: number; language: string }>({
      query: ({ id, language }) => ({
        url: `tv/${id}`,
        params: {
          api_key: API_KEY,
          id,
          language,
        },
      }),
    }),
    getCreditsTv: builder.query<Movie, { id: number; language: string }>({
      query: ({ id, language }) => ({
        url: `tv/${id}/credits`,
        params: {
          api_key: API_KEY,
          id,
          language,
        },
      }),
    }),
    getReviewsTv: builder.query<Movie, { id: number; language: string }>({
      query: ({ id, language }) => ({
        url: `tv/${id}/reviews`,
        params: {
          api_key: API_KEY,
          id,
          language,
        },
      }),
    }),
    getVideoTv: builder.query<Movie, { id: number; language: string }>({
      query: ({ id, language }) => ({
        url: `tv/${id}/videos`,
        params: {
          api_key: API_KEY,
          id,
          language,
        },
      }),
    }),
    getSeasonDetails: builder.query({
      query: ({ tvId, seasonNumber, language }) =>
        `/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=${language}`,
    }),
  }),
});

export const {
  useGetDetailsTvQuery,
  useGetCreditsTvQuery,
  useGetReviewsTvQuery,
  useGetVideoTvQuery,
  useGetSeasonDetailsQuery,
} = tvDetailsApi;
