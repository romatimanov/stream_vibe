"use client";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useCurrentLanguage = () => {
  const language = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const [currentLanguage, setCurrentLanguage] = useState<string | null>(null);

  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);

  return currentLanguage;
};
