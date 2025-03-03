import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Language = "en-US" | "ru-RU";

const getInitialLanguage = (): Language => {
  if (typeof window !== "undefined") {
    return (localStorage.getItem("language") as Language) || "ru-RU";
  }
  return "ru-RU";
};

interface LanguageState {
  currentLanguage: Language;
}

const initialState: LanguageState = {
  currentLanguage: getInitialLanguage(),
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("language", action.payload);
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
