"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NEWS_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_NEWS_API_URL;

export interface NewsArticle {
  source: { name: string };
  author?: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
}

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getMovieNews: builder.query<
      NewsResponse,
      { language: string; page: number }
    >({
      query: ({ language, page }) => ({
        url: "/everything",
        params: {
          apiKey: NEWS_KEY,
          q: language === "ru" ? "movies" : undefined,
          qInTitle: language === "en" ? "movies" : undefined,
          language,
          sortBy: "publishedAt",
          pageSize: 5,
          page,
        },
      }),
    }),
  }),
});

export const { useGetMovieNewsQuery } = newsApi;
