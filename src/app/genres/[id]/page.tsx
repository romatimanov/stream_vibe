"use client";

import { RootState } from "@/store/store";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./genres.module.css";
import { MovieCardGenre } from "@/ui/MovieCardGenre/MovieCardGenre";
import Image from "next/image";
import { useGetMoviesByGenreQuery } from "@/api/movieByGenreApi";
import { Loader } from "@/companents/loader/Loader";

export default function Genre() {
  const params = useParams();
  const [page, setPage] = useState(1);
  const route = useRouter();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  useEffect(() => {
    setPage(1);
  }, [params.id]);

  const genreId = Number(params.id);
  if (isNaN(genreId)) return <p>Жанр не найден</p>;

  const { data, error, isLoading } = useGetMoviesByGenreQuery({
    language: currentLanguage,
    genreId,
    page,
  });

  const handleCLick = (id: number) => {
    route.push(`/movies/${id}`);
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Ошибка загрузки</p>;

  return (
    <div className={`${style.genres} container`}>
      <div className={style.pagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={style.btn + " " + (page === 1 ? style.disabled : "")}
        >
          <Image src="/prev.png" alt="arrow" width={20} height={20} />
        </button>
        <span className={style.page}>{page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className={style.btn}
        >
          <Image src="/next.png" alt="arrow" width={20} height={20} />
        </button>
      </div>
      <div className={style.wrapper}>
        {data && data?.results?.length > 0 ? (
          data.results.map((movie) => (
            <MovieCardGenre
              key={movie.id}
              img={movie.poster_path}
              rating={movie.vote_average}
              view={movie.vote_count}
              title={movie.title}
              onClick={() => handleCLick(movie.id)}
            />
          ))
        ) : (
          <p>Фильмов в этом жанре пока нет</p>
        )}
      </div>
    </div>
  );
}
