"use client";
import Image from "next/image";
import style from "./cast.module.css";
import { NavigationOptions } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";

type CastProps = {
  credits: any;
  currentLanguage: string;
  swiperPrev: string;
  swiperNext: string;
};

export function Cast({
  credits,
  currentLanguage,
  swiperPrev,
  swiperNext,
}: CastProps) {
  const navigationPrevRef = useRef<HTMLButtonElement | null>(null);
  const navigationNextRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <div className={style.contentGroup}>
        <h2 className="global-text">
          {currentLanguage == "en-US" ? "Cast" : "Актеры"}
        </h2>
        <div className={style.customControls}>
          <button ref={navigationPrevRef} className={swiperPrev}>
            <Image src={"/prev.png"} alt="btn" width={21} height={17} />
          </button>
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
        }}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={"auto"}
        loop={true}
      >
        {credits?.cast?.map((cast: any) => (
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
    </>
  );
}
