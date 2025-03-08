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
import { useRouter } from "next/navigation";
import { useGetVideoMoviesQuery } from "@/api/movieDetail";
import ModalComponent from "@/companents/Modal/ModalComponent";

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
  const { data, error, isLoading } = useGetPopularMoviesQuery(currentLanguage);
  const { data: video } = useGetVideoMoviesQuery({
    id: Number(currentMovieId),
    language: currentLanguage,
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
                    <button className={style.filmButton}>
                      <Image
                        src="/plus.png"
                        alt="plus"
                        width={17}
                        height={19}
                      />
                    </button>
                    <button className={style.filmButton}>
                      <Image
                        src="/like.png"
                        alt="like"
                        width={17}
                        height={19}
                      />
                    </button>
                    <button className={style.filmButton}>
                      <Image
                        src="/volume.png"
                        alt="volume"
                        width={17}
                        height={19}
                      />
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
