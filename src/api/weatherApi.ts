"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const WEATHER_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL;

export interface WeatherResponse {
  location: { name: string; country: string };
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    condition: { text: string; icon: string };
  };
}

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<
      WeatherResponse,
      { city: string; language: string }
    >({
      query: ({ city, language }) => ({
        url: "/current.json",
        params: { q: city, lang: language, key: WEATHER_KEY },
      }),
    }),

    getWeatherByCoords: builder.query<
      WeatherResponse,
      { lat: number; lon: number; language: string }
    >({
      query: ({ lat, lon, language }) => ({
        url: "/current.json",
        params: { q: `${lat},${lon}`, lang: language, key: WEATHER_KEY },
      }),
    }),
  }),
});

export const { useGetWeatherByCityQuery, useGetWeatherByCoordsQuery } =
  weatherApi;
