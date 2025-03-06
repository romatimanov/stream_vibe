"use client";

import style from "./startWatch.module.css";
import { useSelector } from "react-redux";
import { useGetPopularMoviesQuery } from "@/api/previewApi";
import { RootState } from "@/store/store";
import { Button } from "@/ui/Button/Button";

export default function StartWatch() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const { data, error, isLoading } = useGetPopularMoviesQuery(currentLanguage);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки</div>;

  if (!currentLanguage) return;

  return (
    <section className={`${style.startWatch}`}>
      <div className={style.trial}>
        <div className={style.trialContent}>
          <div className="global-text--content">
            <h2 className={style.title}>
              {currentLanguage == "en-US"
                ? "Start your free trial today!"
                : "Начните бесплатную пробную версию сегодня!"}
            </h2>
            <p className="global-text">
              {currentLanguage == "en-US"
                ? "This is a clear and concise call to action that encourages users to sign up for a free trial of StreamVibe."
                : "Это четкий и лаконичный призыв к действию, побуждающий пользователей зарегистрироваться для получения бесплатной пробной версии StreamVibe."}
            </p>
          </div>
          <Button>
            {currentLanguage == "en-US"
              ? "Start a Free Trail"
              : "Начать пробный период"}
          </Button>
        </div>
        <ul className={style.track}>
          {data?.results?.map((movie: any, index: number) => (
            <li className={style.img} key={`${movie.id}-${index}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </li>
          ))}
          {data?.results?.map((movie: any, index: number) => (
            <li className={style.img} key={`duplicate-${movie.id}-${index}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
