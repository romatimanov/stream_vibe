import { Swiper, SwiperSlide } from "swiper/react";
import style from "./genres.module.css";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { NavigationOptions } from "swiper/types";
import { MovieBox } from "@/ui/MovieBox/MovieBox";
import { useEffect, useRef, useState } from "react";
import { fetchMovies } from "@/companents/home/explore/fetchGenres";
import { MovieProps } from "../types";

type GenreProps = {
  data: any;
  handleRoute: (id: number) => void;
} & MovieProps;

export function Genres({
  data,
  currentLanguage,
  handleRoute,
  customControls,
  swiperPrev,
  swiperNext,
  swiperPagination,
  exploreSwiper,
  exploreSlide,
  genres,
}: GenreProps) {
  const [language, setLanguage] = useState<string | null>(currentLanguage);
  const [moviesByGenre, setMoviesByGenre] = useState<Record<number, any[]>>({});
  const navigationPrevRef = useRef<HTMLButtonElement | null>(null);
  const navigationNextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

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
  return (
    <>
      <div className={genres}>
        <h2 className="global-title">
          {currentLanguage == "en-US" ? "Our Genres" : "Наши Жанры"}
        </h2>
        <div className={customControls}>
          <button ref={navigationPrevRef} className={swiperPrev}>
            <Image src={"/prev.png"} alt="btn" width={21} height={17} />
          </button>
          <div ref={paginationRef} className={swiperPagination}></div>
          <button ref={navigationNextRef} className={swiperNext}>
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
        className={exploreSwiper}
      >
        {data?.genres?.map((genre: any) => (
          <SwiperSlide
            onClick={() => handleRoute(genre.id)}
            key={genre.id}
            className={exploreSlide}
          >
            <MovieBox title={genre.name}>
              <div className={style.imgContent}>
                {moviesByGenre[genre.id]?.map((movie: any) => (
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
    </>
  );
}
