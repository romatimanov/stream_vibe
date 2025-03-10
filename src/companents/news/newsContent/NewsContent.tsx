"use client";

import { NewsArticle } from "@/api/newsApi";
import { RootState } from "@/store/store";
import { MovieNewsCard } from "@/ui/MovieNewsCard/MovieNewsCard";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import style from "./newsContent.module.css";
import { Weather } from "@/companents/weather/Weather";
import { Loader } from "@/companents/loader/Loader";
import { useGetUpcomingMoviesQuery } from "@/api/upcoming";
import { useRouter } from "next/navigation";

export function NewsContent() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const langCode = currentLanguage.split("-")[0];
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const { data: upcoming } = useGetUpcomingMoviesQuery(currentLanguage);
  const router = useRouter();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["movieNews", langCode, page],
    queryFn: async () => {
      const response = await fetch(
        `/api/news?language=${langCode}&page=${page}`
      );
      if (!response.ok) throw new Error("Ошибка загрузки данных");
      return response.json();
    },
  });

  useEffect(() => {
    refetch();
    setArticles([]);
    setPage(1);
  }, [currentLanguage]);

  useEffect(() => {
    if (data?.articles && data.articles.length > 0) {
      setArticles((prevArticles) => {
        const newArticles = data.articles.filter(
          (newArticle: NewsArticle) =>
            !prevArticles.some((article) => article.url === newArticle.url)
        );
        return [...prevArticles, ...newArticles];
      });
    }
  }, [data]);

  const getNextWeekPremieres = (movies: any) => {
    const today = new Date();

    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + (8 - today.getDay()));

    const nextSunday = new Date(nextMonday);
    nextSunday.setDate(nextMonday.getDate() + 6);

    return movies.filter((movie: any) => {
      const release = new Date(movie.release_date);
      return release >= nextMonday && release <= nextSunday;
    });
  };

  const nextWeekMovies = upcoming ? getNextWeekPremieres(upcoming.results) : [];
  upcoming?.results.map((film) => {
    console.log(film.release_date);
  });

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (error) {
    return <p>Ошибка загрузки:</p>;
  }

  if (isLoading) return <Loader />;

  return (
    <div className={`${style.news} container`}>
      <h1 className="global-title">
        {currentLanguage === "en-US" ? "Movie News" : "Новости кино"}
      </h1>
      <div className={style.content}>
        <aside className={style.aside}>
          <div className={style.newsContent}>
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <MovieNewsCard
                  key={index}
                  urlToImage={article.urlToImage}
                  description={article.description}
                  title={article.title}
                  url={article.url}
                />
              ))
            ) : (
              <p>Нет новостей</p>
            )}
          </div>
          {articles.length < (data?.totalResults || 0) &&
            data?.totalResults > 5 && (
              <button className={style.loadMore} onClick={loadMore}>
                {currentLanguage === "en-US" ? "Load More" : "Загрузить еще"}
              </button>
            )}
        </aside>
        <div className={style.dopContent}>
          <Weather />
          <div className={style.nextWeek}>
            <h4 className="global-title--small">
              {currentLanguage === "en-US"
                ? "Upcoming movies next week"
                : "На следующей неделе"}
            </h4>
            <ul className={style.nextWeekList}>
              {nextWeekMovies.map((movie: any) => (
                <li
                  key={movie.id}
                  className={style.nextWeekItem}
                  onClick={() => router.push(`/movies/${movie.id}`)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className={style.img}
                  />
                  <div className={style.info}>
                    <h3>{movie.title}</h3>
                    <p className="global-text--small">
                      {currentLanguage === "en-US"
                        ? "Release Date:"
                        : "Дата выхода:"}{" "}
                      {movie.release_date}
                    </p>
                    <p className={style.description}>{movie.overview}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
