"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useGetPopularMoviesQuery } from "@/api/previewApi";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import { NavigationOptions } from "swiper/types";
import Image from "next/image";
import style from "./about.module.css";
import { RootState } from "@/store/store";
import { Button } from "@/ui/Button/Button";
import { useGetVideoMoviesQuery } from "@/api/movieDetail";
import ModalComponent from "@/companents/Modal/ModalComponent";
import { Loader } from "@/companents/loader/Loader";
import { useAddWatchMutation } from "@/api/addWatchApi";
import { useGetWatchMoviesQuery } from "@/api/watchListApi";
import { useAddWatch } from "@/hook/useAddWatch";
import { useAddFavoriteMutation } from "@/api/addFavoriteApi";
import { useAddFavorite } from "@/hook/useAddFavorite";
import { useGetFavoriteMoviesQuery } from "@/api/favoriteListApi";

export function About() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const navigationPrevRef = useRef<HTMLButtonElement | null>(null);
  const navigationNextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const [moviesByGenre, setMoviesByGenre] = useState<Record<number, any[]>>({});
  const [currentMovieId, setCurrentMovieId] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addWatchMutation] = useAddWatchMutation();
  const [addFavoriteMutation] = useAddFavoriteMutation();
  const { data, error, isLoading } = useGetPopularMoviesQuery(currentLanguage);
  const [isWatch, setIsWatch] = useState(new Set<number>());
  const [isFavorite, setIsFavorite] = useState(new Set<number>());
  const { data: video } = useGetVideoMoviesQuery({
    id: Number(currentMovieId),
    language: currentLanguage,
  });

  const accountId =
    typeof window !== "undefined"
      ? localStorage.getItem("accountId") || ""
      : "";

  const { data: watch, refetch } = useGetWatchMoviesQuery({
    language: currentLanguage,
    account_id: accountId,
  });
  const { data: favorite, refetch: refetchFavorite } =
    useGetFavoriteMoviesQuery({
      language: currentLanguage,
      account_id: accountId,
    });

  useEffect(() => {
    if (data?.results) {
      setMoviesByGenre(
        data.results.reduce((acc, film) => {
          acc[film.id] = [film];
          return acc;
        }, {} as Record<number, any[]>)
      );
    }
    if (!currentMovieId && data && data.results.length > 0) {
      setCurrentMovieId(data.results[0].id);
    }
  }, [data]);

  useEffect(() => {
    if (watch?.results) {
      setIsWatch(new Set(watch.results.map((film) => film.id)));
    }
  }, [watch]);

  useEffect(() => {
    if (favorite?.results) {
      setIsFavorite(new Set(favorite.results.map((film) => film.id)));
    }
  }, [favorite]);

  if (isLoading) return <Loader />;
  if (error) return <div>Ошибка загрузки</div>;
  return (
    <section className={`${style.about} container`}>
      <div className={style.aboutContent}>
        <div className={style.customControls}>
          <button ref={navigationPrevRef} className={style.swiperPrev}>
            <Image src={"/prev.png"} alt="btn" width={21} height={17} />
          </button>
          <div ref={paginationRef} className={style.swiperPagination}></div>
          <button ref={navigationNextRef} className={style.swiperNext}>
            <Image src={"/next.png"} alt="btn" width={21} height={17} />
          </button>
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
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000 }}
          className={style.exploreSwiper}
          onSlideChange={(swiper) => {
            const activeIndex = swiper.realIndex;
            const currentFilm = data?.results[activeIndex];
            if (currentFilm) {
              setCurrentMovieId(currentFilm.id);
            }
          }}
        >
          {data?.results?.map((film) => (
            <SwiperSlide key={film.id} className={style.aboutSlide}>
              <div className={style.aboutFilm}>
                <div className="global-text--content">
                  <h1 className="global-title">{film.title}</h1>
                  <h2 className={`${style.filmText} global-text`}>
                    {film.overview}
                  </h2>
                </div>
                <div className={style.btnGroup}>
                  <Button
                    styles={style.previewButton}
                    onClick={() => setModalIsOpen(true)}
                  >
                    <Image src="/play.png" alt="play" width={17} height={19} />
                    {currentLanguage === "en-US"
                      ? "Play Now"
                      : "Смотреть сейчас"}
                  </Button>
                  <div className={style.filmButtons}>
                    <button
                      className={style.filmButton}
                      onClick={() =>
                        useAddWatch(film.id, addWatchMutation, refetch)
                      }
                    >
                      {!isWatch.has(film.id) ? (
                        <Image
                          src="/plus.png"
                          alt="watched"
                          width={14}
                          height={14}
                        />
                      ) : (
                        <Image
                          src="/plus-active.svg"
                          alt="watched"
                          width={14}
                          height={14}
                        />
                      )}
                    </button>
                    <button
                      className={style.filmButton}
                      onClick={() =>
                        useAddFavorite(
                          film.id,
                          addFavoriteMutation,
                          refetchFavorite
                        )
                      }
                    >
                      {!isFavorite.has(film.id) ? (
                        <Image
                          src="/like.png"
                          alt="watched"
                          width={14}
                          height={14}
                        />
                      ) : (
                        <Image
                          src="/like-active.svg"
                          alt="watched"
                          width={14}
                          height={14}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className={style.imgContent}>
                {moviesByGenre[film.id]?.map((film) => (
                  <img
                    key={film.id}
                    className={style.exploreMovieImage}
                    src={`https://image.tmdb.org/t/p/w1920/${film.backdrop_path}`}
                    alt={film.title}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <ModalComponent
        video={video}
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        currentLanguage={currentLanguage}
      />
    </section>
  );
}
