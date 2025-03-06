"use client";
import style from "./film.module.css";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useGetGenresMoviesQuery } from "@/api/genresApi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { NavigationOptions } from "swiper/types";
import Image from "next/image";
import { fetchMovies } from "../../home/explore/fetchGenres";
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
import { MovieBox } from "@/ui/MovieBox/MovieBox";
import { MovieCard } from "@/ui/MovieCard/MovieCard";
import { useRouter } from "next/navigation";

export function Films() {
  const currentLanguage = useCurrentLanguage();
  const [language, setLanguage] = useState<string | null>(currentLanguage);
  const [moviesByGenre, setMoviesByGenre] = useState<Record<number, any[]>>({});
  const navigationPrevRef = useRef<HTMLButtonElement | null>(null);
  const navigationNextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const [activeBtn, setActiveBtn] = useState<number>(0);
  const isMobile = useResize(768);
  const route = useRouter();

  const handleClickAtctive = (index: number) => {
    setActiveBtn(index);
  };

  const handleRoute = (id: number) => {
    route.push(`/movies/${id}`);
  };

  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  const { data, error, isLoading } = useGetGenresMoviesQuery(
    language || "ru-RUS"
  );
  const { data: playing } = useGetPlayingMoviesQuery(language || "ru-RUS");
  const { data: top } = useGetTopMoviesQuery(language || "ru-RUS");
  const { data: upcoming } = useGetUpcomingMoviesQuery(language || "ru-RUS");
  const { data: tvPopular } = useGetTvPopularQuery(language || "ru-RUS");
  const { data: tvTop } = useGetTvTopQuery(language || "ru-RUS");
  const { data: tvToday } = useGetTvTodayQuery(language || "ru-RUS");

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

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки</div>;

  if (!currentLanguage) return;
  return (
    <section className={`${style.films} container`}>
      <div className={style.chooseGroup}>
        {(currentLanguage === "en-US"
          ? ["Movies", "Tv & Shows"]
          : ["Фильмы", "Tv & Сериалы"]
        ).map((item, index) => (
          <button
            key={index}
            className={`${style.btnChoose} ${
              activeBtn === index ? style.btnActive : ""
            }`}
            onClick={() => handleClickAtctive(index)}
          >
            {item}
          </button>
        ))}
      </div>
      {!isMobile && (
        <div className={style.filmsWrapper}>
          <div className={style.filmsContent}>
            <Button styles={style.btn}>
              {currentLanguage == "en-US" ? "Movies" : "Фильмы"}
            </Button>
            <div className={style.content}>
              <div className={style.genres}>
                <h2 className="global-title">
                  {currentLanguage == "en-US" ? "Our Genres" : "Наши Жанры"}
                </h2>
                <div className={style.customControls}>
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
                slidesPerView={"auto"}
                loop={true}
                className={style.exploreSwiper}
              >
                {data?.genres?.map((genre) => (
                  <SwiperSlide
                    onClick={() => handleRoute(genre.id)}
                    key={genre.id}
                    className={style.exploreSlide}
                  >
                    <MovieBox title={genre.name}>
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
            </div>
            <div className={style.content}>
              <div className={style.genres}>
                <h2 className="global-title">
                  {currentLanguage == "en-US"
                    ? "Now playning"
                    : "Сейчас смотрят"}
                </h2>
                <div className={style.customControls}>
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
                slidesPerView={"auto"}
                loop={true}
                className={style.exploreSwiper}
              >
                {playing?.results?.map((film) => (
                  <SwiperSlide
                    onClick={() => handleRoute(film.id)}
                    key={film.id}
                    className={style.exploreSlide}
                  >
                    <MovieCard
                      img={film.backdrop_path}
                      rating={film.vote_average}
                      view={film.vote_count}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={style.content}>
              <div className={style.genres}>
                <h2 className="global-title">
                  {currentLanguage == "en-US"
                    ? "Top movies"
                    : "Самые популярные"}
                </h2>
                <div className={style.customControls}>
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
                slidesPerView={"auto"}
                loop={true}
                className={style.exploreSwiper}
              >
                {top?.results?.map((film) => (
                  <SwiperSlide
                    onClick={() => handleRoute(film.id)}
                    key={film.id}
                    className={style.exploreSlide}
                  >
                    <MovieCard
                      img={film.backdrop_path}
                      rating={film.vote_average}
                      view={film.vote_count}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={style.content}>
              <div className={style.genres}>
                <h2 className="global-title">
                  {currentLanguage == "en-US" ? "Upcoming" : "Скоро"}
                </h2>
                <div className={style.customControls}>
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
                slidesPerView={"auto"}
                loop={true}
                className={style.exploreSwiper}
              >
                {upcoming?.results?.map((film) => (
                  <SwiperSlide
                    onClick={() => handleRoute(film.id)}
                    key={film.id}
                    className={style.exploreSlide}
                  >
                    <MovieCard
                      img={film.backdrop_path}
                      rating={film.vote_average}
                      view={film.vote_count}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className={style.filmsContent}>
            <Button styles={style.btn}>
              {currentLanguage == "en-US" ? "Tv & Show" : "Tv & Сериалы"}
            </Button>
            <div className={style.content}>
              <div className={style.genres}>
                <h2 className="global-title">
                  {currentLanguage == "en-US" ? "Popular" : "Cамые популярные"}
                </h2>
                <div className={style.customControls}>
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
                slidesPerView={"auto"}
                loop={true}
                className={style.exploreSwiper}
              >
                {tvPopular?.results?.map((film) => (
                  <SwiperSlide
                    onClick={() => handleRoute(film.id)}
                    key={film.id}
                    className={style.exploreSlide}
                  >
                    <MovieCard
                      img={film.backdrop_path}
                      rating={film.vote_average}
                      view={film.vote_count}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={style.content}>
              <div className={style.genres}>
                <h2 className="global-title">
                  {currentLanguage == "en-US" ? "Top series" : "Топ сериалы"}
                </h2>
                <div className={style.customControls}>
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
                slidesPerView={"auto"}
                loop={true}
                className={style.exploreSwiper}
              >
                {tvTop?.results?.map((film) => (
                  <SwiperSlide
                    onClick={() => handleRoute(film.id)}
                    key={film.id}
                    className={style.exploreSlide}
                  >
                    <MovieCard
                      img={film.backdrop_path}
                      rating={film.vote_average}
                      view={film.vote_count}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={style.content}>
              <div className={style.genres}>
                <h2 className="global-title">
                  {currentLanguage == "en-US"
                    ? "Airing today"
                    : "Сейчас в эфире"}
                </h2>
                <div className={style.customControls}>
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
                slidesPerView={"auto"}
                loop={true}
                className={style.exploreSwiper}
              >
                {tvToday?.results?.map((film) => (
                  <SwiperSlide
                    onClick={() => handleRoute(film.id)}
                    key={film.id}
                    className={style.exploreSlide}
                  >
                    <MovieCard
                      img={film.backdrop_path}
                      rating={film.vote_average}
                      view={film.vote_count}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
      {isMobile && activeBtn === 0 && (
        <div className={style.filmsContent}>
          <Button styles={style.btn}>
            {currentLanguage == "en-US" ? "Movies" : "Фильмы"}
          </Button>
          <div className={style.content}>
            <div className={style.genres}>
              <h2 className="global-title">
                {currentLanguage == "en-US" ? "Our Genres" : "Наши Жанры"}
              </h2>
              <div className={style.customControls}>
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
              slidesPerView={"auto"}
              loop={true}
              className={style.exploreSwiper}
            >
              {data?.genres?.map((genre) => (
                <SwiperSlide
                  onClick={() => handleRoute(genre.id)}
                  key={genre.id}
                  className={style.exploreSlide}
                >
                  <MovieBox title={genre.name}>
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
          </div>
          <div className={style.content}>
            <div className={style.genres}>
              <h2 className="global-title">
                {currentLanguage == "en-US" ? "Now playning" : "Сейчас смотрят"}
              </h2>
              <div className={style.customControls}>
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
              slidesPerView={"auto"}
              loop={true}
              className={style.exploreSwiper}
            >
              {playing?.results?.map((film) => (
                <SwiperSlide
                  onClick={() => handleRoute(film.id)}
                  key={film.id}
                  className={style.exploreSlide}
                >
                  <MovieCard
                    img={film.backdrop_path}
                    rating={film.vote_average}
                    view={film.vote_count}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={style.content}>
            <div className={style.genres}>
              <h2 className="global-title">
                {currentLanguage == "en-US" ? "Top movies" : "Самые популярные"}
              </h2>
              <div className={style.customControls}>
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
              slidesPerView={"auto"}
              loop={true}
              className={style.exploreSwiper}
            >
              {top?.results?.map((film) => (
                <SwiperSlide
                  onClick={() => handleRoute(film.id)}
                  key={film.id}
                  className={style.exploreSlide}
                >
                  <MovieCard
                    img={film.backdrop_path}
                    rating={film.vote_average}
                    view={film.vote_count}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={style.content}>
            <div className={style.genres}>
              <h2 className="global-title">
                {currentLanguage == "en-US" ? "Upcoming" : "Скоро"}
              </h2>
              <div className={style.customControls}>
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
              slidesPerView={"auto"}
              loop={true}
              className={style.exploreSwiper}
            >
              {upcoming?.results?.map((film) => (
                <SwiperSlide
                  onClick={() => handleRoute(film.id)}
                  key={film.id}
                  className={style.exploreSlide}
                >
                  <MovieCard
                    img={film.backdrop_path}
                    rating={film.vote_average}
                    view={film.vote_count}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
      {isMobile && activeBtn === 1 && (
        <div className={style.filmsContent}>
          <Button styles={style.btn}>
            {currentLanguage == "en-US" ? "Tv & Show" : "Tv & Сериалы"}
          </Button>
          <div className={style.content}>
            <div className={style.genres}>
              <h2 className="global-title">
                {currentLanguage == "en-US" ? "Popular" : "Cамые популярные"}
              </h2>
              <div className={style.customControls}>
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
              slidesPerView={"auto"}
              loop={true}
              className={style.exploreSwiper}
            >
              {tvPopular?.results?.map((film) => (
                <SwiperSlide
                  onClick={() => handleRoute(film.id)}
                  key={film.id}
                  className={style.exploreSlide}
                >
                  <MovieCard
                    img={film.backdrop_path}
                    rating={film.vote_average}
                    view={film.vote_count}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={style.content}>
            <div className={style.genres}>
              <h2 className="global-title">
                {currentLanguage == "en-US" ? "Top series" : "Топ сериалы"}
              </h2>
              <div className={style.customControls}>
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
              slidesPerView={"auto"}
              loop={true}
              className={style.exploreSwiper}
            >
              {tvTop?.results?.map((film) => (
                <SwiperSlide
                  onClick={() => handleRoute(film.id)}
                  key={film.id}
                  className={style.exploreSlide}
                >
                  <MovieCard
                    img={film.backdrop_path}
                    rating={film.vote_average}
                    view={film.vote_count}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={style.content}>
            <div className={style.genres}>
              <h2 className="global-title">
                {currentLanguage == "en-US" ? "Airing today" : "Сейчас в эфире"}
              </h2>
              <div className={style.customControls}>
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
              slidesPerView={"auto"}
              loop={true}
              className={style.exploreSwiper}
            >
              {tvToday?.results?.map((film) => (
                <SwiperSlide
                  onClick={() => handleRoute(film.id)}
                  key={film.id}
                  className={style.exploreSlide}
                >
                  <MovieCard
                    img={film.backdrop_path}
                    rating={film.vote_average}
                    view={film.vote_count}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      <StartWatch />
    </section>
  );
}
