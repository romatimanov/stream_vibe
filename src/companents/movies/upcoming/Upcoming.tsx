import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { MovieProps } from "../types";
import { useRef } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { NavigationOptions } from "swiper/types";
import { MovieCard } from "@/ui/MovieCard/MovieCard";

type UpcomingProps = {
  upcoming: any;
  id: string;
  handleRoute: (id: number) => void;
} & MovieProps;

export function Upcoming({
  upcoming,
  handleRoute,
  id,
  ...props
}: UpcomingProps) {
  const navigationPrevRef = useRef<HTMLButtonElement | null>(null);
  const navigationNextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      {" "}
      <div className={props.genres} id="upcoming">
        <h2 className="global-title">
          {props.currentLanguage == "en-US" ? "Upcoming" : "Скоро"}
        </h2>
        <div className={props.customControls}>
          <button ref={navigationPrevRef} className={props.swiperPrev}>
            <Image src={"/prev.png"} alt="btn" width={21} height={17} />
          </button>
          <div ref={paginationRef} className={props.swiperPagination}></div>
          <button ref={navigationNextRef} className={props.swiperNext}>
            <Image src={"/next.png"} alt="btn" width={21} height={17} />
          </button>
        </div>
      </div>
      <div className={props.myWrapper}>
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
          className={props.exploreSwiper}
        >
          {upcoming?.results?.map((film: any) => (
            <SwiperSlide
              onClick={() => handleRoute(film.id)}
              key={film.id}
              className={props.exploreSlide}
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
    </>
  );
}
