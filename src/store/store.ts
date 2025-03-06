"use client";

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { previewApi } from "@/api/previewApi";
import { languageSlice } from "./slice/languageSlice";
import { genresApi } from "@/api/genresApi";
import { searchApi } from "@/api/searchApi";
import { playningApi } from "@/api/playning";
import { upcomingApi } from "@/api/upcoming";
import { topApi } from "@/api/top";
import { tvTopApi } from "@/api/tvTop";
import { tvPopularApi } from "@/api/tvPopular";
import { tvTodayApi } from "@/api/tvToday";
import { movieDetailsApi } from "@/api/movieDetail";
import { tvDetailsApi } from "@/api/tvDetails";

const rootReducer = combineReducers({
  [previewApi.reducerPath]: previewApi.reducer,
  [genresApi.reducerPath]: genresApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [playningApi.reducerPath]: playningApi.reducer,
  [upcomingApi.reducerPath]: upcomingApi.reducer,
  [topApi.reducerPath]: topApi.reducer,
  [tvTopApi.reducerPath]: tvTopApi.reducer,
  [tvPopularApi.reducerPath]: tvPopularApi.reducer,
  [tvTodayApi.reducerPath]: tvTodayApi.reducer,
  [movieDetailsApi.reducerPath]: movieDetailsApi.reducer,
  [tvDetailsApi.reducerPath]: tvDetailsApi.reducer,
  language: languageSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      previewApi.middleware,
      genresApi.middleware,
      searchApi.middleware,
      playningApi.middleware,
      topApi.middleware,
      upcomingApi.middleware,
      tvPopularApi.middleware,
      tvTopApi.middleware,
      tvTodayApi.middleware,
      movieDetailsApi.middleware,
      tvDetailsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
