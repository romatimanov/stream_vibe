"use client";

import { configureStore } from "@reduxjs/toolkit";
import { genresApi } from "@/api/genresApi";
import { previewApi } from "@/api/previewApi";
import { languageSlice } from "@/app/store/slice/languageSlice";

export const store = configureStore({
  reducer: {
    [previewApi.reducerPath]: previewApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer,
    language: languageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(previewApi.middleware, genresApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
