import Image from "next/image";
import style from "./movieCard.module.css";

type MovieCardProps = {
  img: string;
  rating?: number;
  view?: number;
  title?: string;
  onClick?: () => void;
};

export function MovieCardGenre({
  img,
  rating,
  view,
  title,
  onClick,
}: MovieCardProps) {
  function formatViews(view: number) {
    if (view >= 1000) {
      return (view / 1000).toFixed(1) + "K";
    }
    return view.toString();
  }

  return (
    <div className={style.movieCard} onClick={onClick}>
      <p className={style.title}>{title}</p>
      <img
        className={style.poster}
        src={`https://image.tmdb.org/t/p/w780/${img}`}
        alt="poster"
      />
      <div className={style.content}>
        <div className={style.icon}>
          <Image
            className={style.star}
            src="/star.svg"
            alt="star"
            width={14}
            height={14}
          />
          <span className={style.ratingValue}>{rating?.toFixed(1)}</span>
        </div>
        <div className={style.icon}>
          <Image
            className={style.eye}
            src="/eye.png"
            alt="eye"
            width={21}
            height={16}
          />
          <span className={style.viewsValue}>{formatViews(view!)}</span>
        </div>
      </div>
    </div>
  );
}
