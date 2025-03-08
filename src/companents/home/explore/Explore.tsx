"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import style from "./explore.module.css";
import { useGetGenresMoviesQuery } from "@/api/genresApi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { NavigationOptions } from "swiper/types";
import Image from "next/image";
import { fetchMovies } from "./fetchGenres";
import { MovieBox } from "@/ui/MovieBox/MovieBox";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

export default function Explore() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const [language, setLanguage] = useState<string | null>(currentLanguage);
  const [moviesByGenre, setMoviesByGenre] = useState<Record<number, any[]>>({});
  const navigationPrevRef = useRef<HTMLButtonElement | null>(null);
  const navigationNextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const route = useRouter();

  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  const { data, error, isLoading } = useGetGenresMoviesQuery(
    language || "ru-RUS"
  );
  console.log(data);

  useEffect(() => {
    if (data?.genres) {
      const fetchAllMovies = async () => {
        const moviesData: Record<number, any[]> = {};
        for (const genre of data.genres) {
          const movies = await fetchMovies(genre.id, language || "en-US");
          moviesData[genre.id] = movies?.results?.slice(0, 4) || [];
        }
        setMoviesByGenre(moviesData);
      };
      fetchAllMovies();
    }
  }, [data, language]);

  const hanldeGenreClick = (id: number) => {
    route.push(`/genres/${id}`);
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки</div>;

  return (
    <section className={`${style.explore} container`}>
      <div className={style.exploreContent}>
        <div className="global-text--content">
          <h2 className="global-title">
            {language === "en-US"
              ? "Explore our wide variety of categories"
              : "Изучите наше разнообразие категорий"}
          </h2>
          <p className="global-text">
            {language === "en-US"
              ? " Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new"
              : "Ищете ли вы комедию, которая заставит вас смеяться, драму, которая заставит вас задуматься, или документальный фильм, который поможет вам узнать что-то новое?"}
          </p>
        </div>
        <div className={style.customControls}>
          <button ref={navigationPrevRef} className={style.swiperPrev}>
            <Image src={"/prev.png"} alt="btn" width={21} height={17} />
          </button>
          <div ref={paginationRef} className={style.swiperPagination}></div>
          <button ref={navigationNextRef} className={style.swiperNext}>
            <Image src={"/next.png"} alt="btn" width={21} height={17} />
          </button>
        </div>
      </div>
      <Swiper
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            const navOptions = swiper.params.navigation as NavigationOptions;
            navOptions.prevEl = navigationPrevRef.current;
            navOptions.nextEl = navigationNextRef.current;
          }
          if (
            swiper.params.pagination &&
            typeof swiper.params.pagination !== "boolean"
          ) {
            const paginationOptions = swiper.params.pagination;
            paginationOptions.el = paginationRef.current;
            paginationOptions.clickable = true;
            paginationOptions.type = "custom";
            paginationOptions.renderCustom = (swiper, current, total) => {
              const bulletCount = 4;
              let bulletsHTML = "";
              const activeIndex = (current - 1) % bulletCount;
              for (let i = 0; i < bulletCount; i++) {
                bulletsHTML += `<span class="swiper-pagination-bullet ${
                  i === activeIndex ? "swiper-pagination-bullet-active" : ""
                }"></span>`;
              }
              return bulletsHTML;
            };
          }
        }}
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={"auto"}
        loop={true}
        className={style.exploreSwiper}
      >
        {data?.genres?.map((genre) => (
          <SwiperSlide key={genre.id} className={style.exploreSlide}>
            <MovieBox
              title={genre.name}
              onClick={() => hanldeGenreClick(genre.id)}
            >
              <div className={style.imgContent}>
                {moviesByGenre[genre.id]?.map((movie) => (
                  <img
                    key={movie.id}
                    className={style.exploreMovieImage}
                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                ))}
              </div>
            </MovieBox>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
