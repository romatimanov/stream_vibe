import Image from "next/image";
import style from "./infoMovie.module.css";
import RatingStars from "@/companents/rating/Rating";

type InfoMovieProps = {
  data: any;
  currentLanguage: string;
  director: any;
};

export function InfoMovie({ data, currentLanguage, director }: InfoMovieProps) {
  return (
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
          {data?.release_date?.split("").splice(0, 4).join("")}
          {data?.first_air_date?.split("").splice(5).join("")}
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
            {currentLanguage === "en-US" ? "Available Languages" : "Языки"}
          </p>
        </div>
        <div className={style.langGroup}>
          {data?.spoken_languages.map((lang: any) => (
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
          {data?.genres.map((genre: any) => (
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
  );
}
