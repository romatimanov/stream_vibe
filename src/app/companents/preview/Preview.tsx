"use client";

import React from "react";
import styles from "./preview.module.css";
import { useGetPopularMoviesQuery } from "@/api/previewApi";
import Image from "next/image";
import { Button } from "@/app/ui/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export default function Preview() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const { data, error, isLoading } = useGetPopularMoviesQuery(currentLanguage);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки</div>;

  return (
    <div className={styles.preview}>
      <div className={styles.previewSlider}>
        <Image
          className={styles.previewBackground}
          src="/preview.png"
          alt="background"
          width={350}
          height={350}
        />
        <div className={styles.slider}>
          <ul className={styles.track}>
            {data?.results?.map((movie: any, index: number) => (
              <li className={styles.img} key={`${movie.id}-${index}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </li>
            ))}
            {data?.results?.map((movie: any, index: number) => (
              <li className={styles.img} key={`duplicate-${movie.id}-${index}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={`${styles.slider} ${styles.reverse}`}>
          <ul className={styles.track}>
            {data?.results?.map((movie: any, index: number) => (
              <li className={styles.img} key={`reverse-${movie.id}-${index}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </li>
            ))}
            {data?.results?.map((movie: any, index: number) => (
              <li
                className={styles.img}
                key={`reverse-duplicate-${movie.id}-${index}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.slider}>
          <ul className={styles.track}>
            {data?.results?.map((movie: any, index: number) => (
              <li className={styles.img} key={`${movie.id}-${index}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </li>
            ))}
            {data?.results?.map((movie: any, index: number) => (
              <li className={styles.img} key={`duplicate-${movie.id}-${index}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={`${styles.slider} ${styles.reverse}`}>
          <ul className={styles.track}>
            {data?.results?.map((movie: any, index: number) => (
              <li className={styles.img} key={`reverse-${movie.id}-${index}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </li>
            ))}
            {data?.results?.map((movie: any, index: number) => (
              <li
                className={styles.img}
                key={`reverse-duplicate-${movie.id}-${index}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${styles.previewContent} container`}>
        <div className="global-text--content">
          <h1 className={styles.previewTitle}>
            {currentLanguage == "ru-RU"
              ? "Лучший потоковый сервис"
              : "The Best Streaming Experience"}
          </h1>
          <p className={styles.previewText}>
            {currentLanguage === "en-US"
              ? "StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch."
              : "StreamVibe — это лучший потоковый сервис для просмотра ваших любимых фильмов и сериалов по запросу, в любое время и в любом месте. С StreamVibe вы получите доступ к огромному выбору контента, включая последние блокбастеры, классические фильмы, популярные телешоу и многое другое. Вы также можете создавать собственные списки просмотров, чтобы легко находить нужный контент."}
          </p>
        </div>
        <Button styles={styles.previewButton}>
          <Image src="/play.png" alt="play" width={17} height={19} />
          {currentLanguage === "en-US"
            ? "Start Watching Now"
            : "Начни смотреть сейчас"}
        </Button>
      </div>
    </div>
  );
}
