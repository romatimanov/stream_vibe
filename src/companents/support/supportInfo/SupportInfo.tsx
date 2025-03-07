"use client";
import { useSelector } from "react-redux";
import style from "./supportInfo.module.css";
import { useGetPopularMoviesQuery } from "@/api/previewApi";
import { RootState } from "@/store/store";

export function SupportInfo() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const { data, error, isLoading } = useGetPopularMoviesQuery({
    language: currentLanguage,
    page: 2,
  });

  return (
    <div className={`${style.supportInfo} container`}>
      <div className={style.supportInfoContent}>
        <div className="global-text--content">
          <h1 className="global-title">
            {currentLanguage == "en-US"
              ? "Welcome to our support page!"
              : "Добро пожаловать на нашу страницу поддержки!"}
          </h1>
          <h2 className="global-text">
            We're here to help you with any problems you may be having with our
            product.
          </h2>
        </div>
        <div className={style.supportInfoImg}>
          {data?.results?.map((movie: any, index: number) => (
            <img
              key={`${movie.id}-${index}`}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={style.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
