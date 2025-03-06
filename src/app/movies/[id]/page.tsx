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
import { Button } from "@/ui/Button/Button";
import Image from "next/image";
import Modal from "react-modal";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { NavigationOptions } from "swiper/types";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import RatingStars from "@/companents/rating/Rating";
import { useResize } from "@/hook/useResize";

export default function Movie() {
  const params = useParams();
  const movieId = params?.id as string;
  const navigationPrevRef = useRef<HTMLButtonElement | null>(null);
  const navigationNextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const isMobile = useResize(768);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && document.getElementById("__next")) {
      Modal.setAppElement("#__next");
    }
  }, []);

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

  console.log(credits);

  if (isLoading) return <div className={style.loading}>Загрузка...</div>;
  if (error) return <p>Ошибка при загрузке фильма</p>;

  return (
    <div className={`${style.movieDetails} container`}>
      {isLoading ? (
        <div className={style.loading}>Загрузка...</div>
      ) : (
        <div className={style.content}>
          {isImageLoaded && (
            <div className={style.aboutFilm}>
              <div className="global-text--content">
                <h1 className="global-title">{data?.title}</h1>
                <h2 className={`${style.filmText} global-text`}>
                  {data?.overview}
                </h2>
              </div>
              <div className={style.btnGroup}>
                <Button
                  styles={style.previewButton}
                  onClick={() => setModalIsOpen(true)}
                >
                  <Image src="/play.png" alt="play" width={17} height={19} />
                  {currentLanguage === "en-US" ? "Play Now" : "Смотреть сейчас"}
                </Button>
                <div className={style.filmButtons}>
                  <button className={style.filmButton}>
                    <Image src="/plus.png" alt="plus" width={17} height={19} />
                  </button>
                  <button className={style.filmButton}>
                    <Image src="/like.png" alt="like" width={17} height={19} />
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
          )}
          <div className={style.contentImage}>
            <img
              className={style.poster}
              src={`https://image.tmdb.org/t/p/w1920/${data?.backdrop_path}`}
              alt="movieDetails"
              onLoad={() => setIsImageLoaded(true)}
              style={{ display: isImageLoaded ? "block" : "loading" }}
            />
          </div>
        </div>
      )}
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
          <div className={style.content}>
            <div className={style.contentGroup}>
              <h2 className="global-text">
                {currentLanguage == "en-US" ? "Cast" : "Актеры"}
              </h2>
              <div className={style.customControls}>
                <button ref={navigationPrevRef} className={style.swiperPrev}>
                  <Image src={"/prev.png"} alt="btn" width={21} height={17} />
                </button>
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
                  const navOptions = swiper.params
                    .navigation as NavigationOptions;
                  navOptions.prevEl = navigationPrevRef.current;
                  navOptions.nextEl = navigationNextRef.current;
                }
              }}
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={"auto"}
              loop={true}
              className={style.exploreSwiper}
            >
              {credits?.cast?.map((cast) => (
                <SwiperSlide key={cast.id} className={style.caseSlide}>
                  {cast.profile_path ? (
                    <img
                      className={style.castImage}
                      src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                      alt="cast"
                    />
                  ) : (
                    <div className={style.none}>
                      {currentLanguage === "en-US" ? "No photo" : "Нет фото"}
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className={style.info}>
          <div className={style.contentReview}>
            <div className={style.contentGroup}>
              <h2 className="global-text">
                {currentLanguage == "en-US" ? "Reviews" : "Отзывы"}
              </h2>
              {reviews?.results?.length && reviews?.results?.length > 0 ? (
                <div className={style.customControlsReview}>
                  <button ref={navigationPrevRef} className={style.swiperPrev}>
                    <Image src={"/prev.png"} alt="btn" width={21} height={17} />
                  </button>
                  <div
                    ref={paginationRef}
                    className={style.swiperPagination}
                  ></div>
                  <button ref={navigationNextRef} className={style.swiperNext}>
                    <Image src={"/next.png"} alt="btn" width={21} height={17} />
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            {reviews?.results?.length && reviews?.results?.length > 0 ? (
              <div className={style.reviewSlider}>
                <Swiper
                  onBeforeInit={(swiper) => {
                    if (
                      swiper.params.navigation &&
                      typeof swiper.params.navigation !== "boolean"
                    ) {
                      const navOptions = swiper.params
                        .navigation as NavigationOptions;
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
                      paginationOptions.renderCustom = (
                        swiper,
                        current,
                        total
                      ) => {
                        const bulletCount = 4;
                        let bulletsHTML = "";
                        const activeIndex = (current - 1) % bulletCount;
                        for (let i = 0; i < bulletCount; i++) {
                          bulletsHTML += `<span class="swiper-pagination-bullet ${
                            i === activeIndex
                              ? "swiper-pagination-bullet-active"
                              : ""
                          }"></span>`;
                        }
                        return bulletsHTML;
                      };
                    }
                  }}
                  modules={[Navigation, Pagination]}
                  spaceBetween={20}
                  slidesPerView={isMobile ? 1 : 2}
                  loop={true}
                  className={style.reviewSwiper}
                >
                  {reviews?.results?.map((review) => (
                    <SwiperSlide key={review.id} className={style.exploreSlide}>
                      <div className={style.review}>
                        <div className={style.reviewHeader}>
                          <div className={style.reviewAuthor}>
                            <p className={style.name}>
                              {review.author_details?.name}
                            </p>
                            <p className="global-text">
                              {review.author_details?.username}
                            </p>
                          </div>
                          <div className={style.rating}>
                            <RatingStars
                              rating={review.author_details?.rating}
                            />
                          </div>
                        </div>
                        <div className={style.reviewContent}>
                          <p className={style.reviewText}>{review.content}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <p>
                {currentLanguage === "en-US" ? "No reviews" : "Нет отзывов"}
              </p>
            )}
          </div>
        </div>
        <div className={style.info}>
          <div className={style.contentAboutMovie}>
            <div className={style.contentGroupInfo}>
              <div className={style.realese}>
                <Image
                  className={style.icon}
                  src={"/calendar.png"}
                  alt="icon"
                  width={20}
                  height={20}
                />
                <p className="global-text">
                  {currentLanguage === "en-US" ? "Released Year" : "Год выхода"}
                </p>
              </div>
              <p className={style.name}>
                {data?.release_date.split("").splice(0, 4).join("")}
              </p>
            </div>
            <div className={style.contentGroupInfo}>
              <div className={style.realese}>
                <Image
                  className={style.icon}
                  src={"/language.png"}
                  alt="icon"
                  width={20}
                  height={20}
                />
                <p className="global-text">
                  {currentLanguage === "en-US"
                    ? "Available Languages"
                    : "Языки"}
                </p>
              </div>
              <div className={style.langGroup}>
                {data?.spoken_languages.map((lang) => (
                  <p key={lang.name} className={style.lang}>
                    {lang.name}
                  </p>
                ))}
              </div>
            </div>
            <div className={style.contentGroupInfo}>
              <div className={style.realese}>
                <Image
                  className={style.icon}
                  src={"/star.svg"}
                  alt="icon"
                  width={20}
                  height={20}
                />
                <p className="global-text">
                  {currentLanguage === "en-US" ? "Ratings" : "Рейтинг"}
                </p>
              </div>
              <div className={style.imdb}>
                <p className={style.name}>IMDb</p>
                <RatingStars rating={data?.vote_average ?? 0} />
              </div>
            </div>
            <div className={style.contentGroupInfo}>
              <div className={style.realese}>
                <Image
                  className={style.icon}
                  src={"/genres.png"}
                  alt="icon"
                  width={20}
                  height={20}
                />
                <p className="global-text">
                  {currentLanguage === "en-US" ? "Genres" : "Жанры"}
                </p>
              </div>
              <div className={style.langGroup}>
                {data?.genres.map((genre) => (
                  <p key={genre.id} className={style.lang}>
                    {genre.name}
                  </p>
                ))}
              </div>
            </div>
            <div className={style.contentGroupInfo}>
              <div className={style.realese}>
                <p className="global-text">
                  {currentLanguage === "en-US" ? "Director" : "Режиссёр"}
                </p>
              </div>
              <div className={style.director}>
                {director?.profile_path ? (
                  <img
                    className={style.directorImg}
                    src={`https://image.tmdb.org/t/p/w500${director?.profile_path}`}
                    alt="director"
                  />
                ) : (
                  ""
                )}
                <p className={style.name}>
                  {director ? director.name : "Неизвестный режиссер"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Простая модалка"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 1000,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            background: "#141414",
            padding: "5px",
            borderRadius: "10px",
            border: "2px solid #262626",
            maxWidth: "900px",
            width: "100%",
          },
        }}
      >
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${video?.results[0].key}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          className={style.video}
        ></iframe>
      </Modal>
    </div>
  );
}
