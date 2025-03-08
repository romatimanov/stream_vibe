import style from "./movieCard.module.css";

type MovieCardProps = {
  urlToImage?: string;
  title?: string;
  url?: string;
  description?: string;
};

export function MovieNewsCard({
  urlToImage,
  description,
  title,
  url,
}: MovieCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={style.movieCard}
    >
      <div className={style.content}>
        <div className={style.textContent}>
          <h3 className={style.title}>{title}</h3>
          <p className={style.description}>{description}</p>
        </div>
        {urlToImage && (
          <img src={urlToImage} alt={title} className={style.poster} />
        )}
      </div>
    </a>
  );
}
