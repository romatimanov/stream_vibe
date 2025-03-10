"use client";

import { useParams } from "next/navigation";
import {
  useGetCreditsMoviesQuery,
  useGetDetailsMoviesQuery,
  useGetReviewsMoviesQuery,
  useGetVideoMoviesQuery,
} from "@/api/movieDetail";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import style from "./movieDetails.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React, { useState } from "react";
import { useResize } from "@/hook/useResize";
import { AboutFims } from "@/companents/showAndMovies/aboutFilm/AboutFims";
import { Cast } from "@/companents/showAndMovies/cast/Cast";
import { Review } from "@/companents/showAndMovies/review/Review";
import { InfoMovie } from "@/companents/showAndMovies/infoMovie/InfoMovie";
import ModalComponent from "@/companents/Modal/ModalComponent";
import { Loader } from "@/companents/loader/Loader";

export default function Movie() {
  const params = useParams();
  const movieId = params?.id as string;
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const isMobile = useResize(768);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const { data, isLoading, error } = useGetDetailsMoviesQuery({
    id: Number(movieId),
    language: currentLanguage,
  });

  const { data: credits } = useGetCreditsMoviesQuery({
    id: Number(movieId),
    language: currentLanguage,
  });

  const { data: reviews } = useGetReviewsMoviesQuery({
    id: Number(movieId),
    language: currentLanguage,
  });

  const { data: video } = useGetVideoMoviesQuery({
    id: Number(movieId),
    language: currentLanguage,
  });

  const director = credits?.crew?.find(
    (person) => person.known_for_department === "Directing"
  );
  console.log(video);

  if (isLoading) return <Loader />;
  if (error) return <p>Ошибка при загрузке фильма</p>;

  return (
    <div className={`${style.movieDetails} container`}>
      <AboutFims
        isLoading={isLoading}
        isImageLoaded={isImageLoaded}
        data={data}
        currentLanguage={currentLanguage}
        setModalIsOpen={setModalIsOpen}
        setIsImageLoaded={setIsImageLoaded}
      />
      <div className={style.movieInfo}>
        <div className={style.info}>
          <div className="global-text--content">
            <p className="global-text">
              {currentLanguage === "en-US" ? "Description" : "Описание"}
            </p>
            <h4 className={`${style.description} global-text`}>
              {data?.overview}
            </h4>
          </div>
        </div>
        <div className={style.info}>
          <Cast
            credits={credits}
            currentLanguage={currentLanguage}
            swiperPrev={style.swiperPrev}
            swiperNext={style.swiperNext}
          />
        </div>
        <div className={style.info}>
          <Review
            reviews={reviews}
            currentLanguage={currentLanguage}
            swiperPrev={style.swiperPrev}
            swiperNext={style.swiperNext}
            isMobile={isMobile}
          />
        </div>
        <div className={style.info}>
          <InfoMovie
            data={data}
            currentLanguage={currentLanguage}
            director={director}
          />
        </div>
      </div>
      <ModalComponent
        video={video}
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
        currentLanguage={currentLanguage}
      />
    </div>
  );
}
