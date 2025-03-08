import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  original_title?: string;
  overview?: string;
  genre_ids?: number[];
  vote_average: number;
  vote_count: number;
}

export interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}

export const movieByGenreApi = createApi({
  reducerPath: "movieByGenreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/3`,
  }),
  endpoints: (builder) => ({
    getMoviesByGenre: builder.query<
      MoviesResponse,
      { language: string; genreId: number; page: number }
    >({
      query: ({ language, genreId, page }) => ({
        url: "/discover/movie",
        params: {
          api_key: API_KEY,
          language,
          with_genres: genreId,
          page,
        },
      }),
    }),
  }),
});

export const { useGetMoviesByGenreQuery } = movieByGenreApi;
