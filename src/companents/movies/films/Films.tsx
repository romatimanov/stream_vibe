"use client";
import style from "./film.module.css";
import React, { useState, useEffect } from "react";
import { useGetGenresMoviesQuery } from "@/api/genresApi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useGetPlayingMoviesQuery } from "@/api/playning";
import { useGetTopMoviesQuery } from "@/api/top";
import { useGetUpcomingMoviesQuery } from "@/api/upcoming";
import { useGetTvPopularQuery } from "@/api/tvPopular";
import { useGetTvTopQuery } from "@/api/tvTop";
import { useGetTvTodayQuery } from "@/api/tvToday";
import StartWatch from "../../startWatch/StartWatch";
import { useCurrentLanguage } from "@/hook/useCurrentLanguage";
import { useResize } from "@/hook/useResize";
import { Button } from "@/ui/Button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { Genres } from "../genres/Genres";
import { Playning } from "../playning/Playning";
import { TopMovie } from "../topMovie/topMovie";
import { Upcoming } from "../upcoming/Upcoming";
import { TvPopular } from "../tvPopular/TvPoplar";
import { TopSeries } from "../topSeries/TopSeries";
import { Airing } from "../airing/Airing";
import { Loader } from "@/companents/loader/Loader";

export function Films() {
  const currentLanguage = useCurrentLanguage();
  const [language, setLanguage] = useState(currentLanguage);
  const [activeBtn, setActiveBtn] = useState(0);
  const isMobile = useResize(768);
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeFromUrl = searchParams.get("type");

  useEffect(() => {
    if (typeFromUrl === "tv") {
      setActiveBtn(1);
    } else if (typeFromUrl === "movie") {
      setActiveBtn(0);
    }
  }, [typeFromUrl]);

  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  const { data: playing } = useGetPlayingMoviesQuery(language || "ru-RUS");
  const { data: top } = useGetTopMoviesQuery(language || "ru-RUS");
  const { data: upcoming } = useGetUpcomingMoviesQuery(language || "ru-RUS");
  const { data: tvPopular } = useGetTvPopularQuery(language || "ru-RUS");
  const { data: tvTop } = useGetTvTopQuery(language || "ru-RUS");
  const { data: tvToday } = useGetTvTodayQuery(language || "ru-RUS");
  const {
    data: genres,
    error,
    isLoading,
  } = useGetGenresMoviesQuery(language || "ru-RUS");

  const swiperStyles = {
    customControls: style.customControls,
    swiperPrev: style.swiperPrev,
    swiperNext: style.swiperNext,
    swiperPagination: style.swiperPagination,
    exploreSwiper: style.exploreSwiper,
    exploreSlide: style.exploreSlide,
    genres: style.genres,
    myWrapper: style.myWrapper,
  };

  const handleClickActive = (index: number) => setActiveBtn(index);
  const handleRoute = (id: number) => router.push(`/movies/${id}`);
  const handleRouteTv = (id: number) => router.push(`/tv/${id}`);
  const handleRouteGenre = (id: number) => router.push(`/genres/${id}`);

  if (isLoading) return <Loader />;
  if (error) return <div>Ошибка загрузки</div>;
  if (!currentLanguage) return null;

  const renderContent = (data: any, Component: any, handleRouteFn: any) => (
    <div className={style.content}>
      <Component
        {...data}
        currentLanguage={currentLanguage}
        handleRoute={handleRouteFn}
        handleRouteTv={handleRouteFn}
        handleRouteGenre={handleRouteFn}
        {...swiperStyles}
      />
    </div>
  );

  return (
    <section className={`${style.films}`}>
      <div className="container">
        <div className={style.chooseGroup}>
          {["Фильмы", "Tv & Сериалы"].map((item, index) => (
            <button
              key={index}
              className={`${style.btnChoose} ${
                activeBtn === index ? style.btnActive : ""
              }`}
              onClick={() => handleClickActive(index)}
            >
              {item}
            </button>
          ))}
        </div>

        {!isMobile && (
          <div className={style.filmsWrapper}>
            <div className={style.filmsContent}>
              <Button styles={style.btn}>
                {currentLanguage === "en-US" ? "Movies" : "Фильмы"}
              </Button>
              {renderContent({ data: genres }, Genres, handleRouteGenre)}
              {renderContent({ playing }, Playning, handleRoute)}
              {renderContent({ top }, TopMovie, handleRoute)}
              {renderContent({ upcoming }, Upcoming, handleRoute)}
            </div>

            <div className={style.filmsContent}>
              <Button styles={style.btn}>
                {currentLanguage === "en-US" ? "Tv & Show" : "Tv & Сериалы"}
              </Button>
              {renderContent({ tvPopular }, TvPopular, handleRouteTv)}
              {renderContent({ tvTop }, TopSeries, handleRouteTv)}
              {renderContent({ tvToday }, Airing, handleRouteTv)}
            </div>
          </div>
        )}

        {isMobile && activeBtn === 0 && (
          <div className={style.filmsContent}>
            <Button styles={style.btn}>
              {currentLanguage === "en-US" ? "Movies" : "Фильмы"}
            </Button>
            {renderContent({ data: genres }, Genres, handleRoute)}
            {renderContent({ playing }, Playning, handleRoute)}
            {renderContent({ top }, TopMovie, handleRoute)}
            {renderContent({ upcoming }, Upcoming, handleRoute)}
          </div>
        )}

        {isMobile && activeBtn === 1 && (
          <div className={style.filmsContent}>
            <Button styles={style.btn}>
              {currentLanguage === "en-US" ? "Tv & Show" : "Tv & Сериалы"}
            </Button>
            {renderContent({ tvPopular }, TvPopular, handleRouteTv)}
            {renderContent({ tvTop }, TopSeries, handleRouteTv)}
            {renderContent({ tvToday }, Airing, handleRouteTv)}
          </div>
        )}
      </div>
      <StartWatch />
    </section>
  );
}
