import style from "./rating.module.css";

const RatingStars = ({ rating }: { rating: number }) => {
  const maxStars = 5;
  const filledStars = Math.round(rating / 2);

  return (
    <div className={style.rating}>
      {[...Array(maxStars)].map((_, index) => (
        <img
          key={index}
          src={index < filledStars ? "/star-red.png" : "/star.svg"}
          alt="rating"
          className={style.star}
        />
      ))}
    </div>
  );
};

export default RatingStars;
