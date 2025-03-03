import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

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
