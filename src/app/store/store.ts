"use client";

import { configureStore } from "@reduxjs/toolkit";
import { genresApi } from "@/api/genresApi";
import { previewApi } from "@/api/previewApi";
import { languageSlice } from "@/app/store/slice/languageSlice";
import { searchApi } from "@/api/searchApi";
import { activePageSlice } from "@/app/store/slice/activePage";

export const store = configureStore({
  reducer: {
    [previewApi.reducerPath]: previewApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    language: languageSlice.reducer,
    activePage: activePageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      previewApi.middleware,
      genresApi.middleware,
      searchApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
