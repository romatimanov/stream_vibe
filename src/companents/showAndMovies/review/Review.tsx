import { NavigationOptions } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import style from "./review.module.css";
import Image from "next/image";
import RatingStars from "@/companents/rating/Rating";

type ReviewProps = {
  reviews: any;
  currentLanguage: string;
  swiperPrev: string;
  swiperNext: string;
  isMobile: boolean;
};

export function Review({
  reviews,
  currentLanguage,
  swiperPrev,
  swiperNext,
  isMobile,
}: ReviewProps) {
  const navigationPrevRef = useRef<HTMLButtonElement | null>(null);
  const navigationNextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className={style.contentReview}>
      <div className={style.contentGroup}>
        <h2 className="global-text">
          {currentLanguage == "en-US" ? "Reviews" : "Отзывы"}
        </h2>
        {reviews?.results?.length && reviews?.results?.length > 0 ? (
          <div className={style.customControlsReview}>
            <button ref={navigationPrevRef} className={swiperPrev}>
              <Image src={"/prev.png"} alt="btn" width={21} height={17} />
            </button>
            <div ref={paginationRef} className={style.swiperPagination}></div>
            <button ref={navigationNextRef} className={swiperNext}>
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
            slidesPerView={isMobile ? 1 : 2}
            loop={true}
            className={style.reviewSwiper}
          >
            {reviews?.results?.map((review: any) => (
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
                      <RatingStars rating={review.author_details?.rating} />
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
        <p>{currentLanguage === "en-US" ? "No reviews" : "Нет отзывов"}</p>
      )}
    </div>
  );
}
