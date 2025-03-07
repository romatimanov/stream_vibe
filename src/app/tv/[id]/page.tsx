"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import style from "./movieDetails.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useResize } from "@/hook/useResize";
import {
  useGetCreditsTvQuery,
  useGetDetailsTvQuery,
  useGetReviewsTvQuery,
  useGetVideoTvQuery,
} from "@/api/tvDetails";
import { AboutFims } from "@/companents/showAndMovies/aboutFilm/AboutFims";
import { Cast } from "@/companents/showAndMovies/cast/Cast";
import { Review } from "@/companents/showAndMovies/review/Review";
import { InfoMovie } from "@/companents/showAndMovies/infoMovie/InfoMovie";
import ModalComponent from "@/companents/Modal/ModalComponent";
import { SeasonDetails } from "@/companents/showAndMovies/seasonDetails/SeasonDetails";
import * as Accordion from "@radix-ui/react-accordion";
import Image from "next/image";

export default function Tv() {
  const params = useParams();
  const movieId = params?.id as string;
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const isMobile = useResize(768);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeSeason, setActiveSeason] = useState<string | undefined>(
    undefined
  );

  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const { data, isLoading, error } = useGetDetailsTvQuery({
    id: Number(movieId),
    language: currentLanguage,
  });

  const { data: credits } = useGetCreditsTvQuery({
    id: Number(movieId),
    language: currentLanguage,
  });

  const { data: reviews } = useGetReviewsTvQuery({
    id: Number(movieId),
    language: currentLanguage,
  });

  const { data: video } = useGetVideoTvQuery({
    id: Number(movieId),
    language: currentLanguage,
  });

  const director = credits?.crew?.find(
    (person) => person.known_for_department === "Directing"
  );

  if (isLoading) return <div className={style.loading}>Загрузка...</div>;
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
          <Accordion.Root
            className={style.accordionRoot}
            type="single"
            collapsible
            value={activeSeason}
            onValueChange={setActiveSeason}
          >
            {data?.seasons?.map((season: any) => (
              <Accordion.Item
                className={style.accordionItem}
                key={season.id}
                value={`season-${season.id}`}
              >
                <Accordion.Trigger className={style.accordionTrigger}>
                  <div className={style.accGroup}>
                    <div className={style.accTextGroup}>
                      <p>
                        {currentLanguage === "en-US" ? "Season" : "Сезон"}{" "}
                        {season.season_number}
                      </p>
                      <p className={style.episodeCount}>
                        {season.episode_count}{" "}
                        {currentLanguage === "en-US" ? "episodes" : "эпизодов"}
                      </p>
                    </div>
                    <span className={style.accordionButton}>
                      <Image
                        src="/down.png"
                        alt="arrow"
                        width={16}
                        height={16}
                      />
                    </span>
                  </div>
                </Accordion.Trigger>
                <Accordion.Content className={style.accordionContent}>
                  <SeasonDetails tvId={data.id} season={season} />
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>

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
