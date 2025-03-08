"use client";

import { NewsArticle, useGetMovieNewsQuery } from "@/api/newsApi";
import { RootState } from "@/store/store";
import { MovieNewsCard } from "@/ui/MovieNewsCard/MovieNewsCard";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import style from "./newsContent.module.css";
import { Weather } from "@/companents/weather/Weather";

export function NewsContent() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const langCode = currentLanguage.split("-")[0];

  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  const { data, error, isLoading } = useGetMovieNewsQuery({
    language: langCode,
    page,
  });

  useEffect(() => {
    if (data?.articles && data.articles.length > 0) {
      setArticles((prevArticles) => {
        const newArticles = data.articles.filter(
          (newArticle) =>
            !prevArticles.some((article) => article.url === newArticle.url)
        );
        return [...prevArticles, ...newArticles];
      });
    }
  }, [data]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading && page === 1) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки</p>;

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
          {articles.length < (data?.totalResults || 0) && (
            <button className={style.loadMore} onClick={loadMore}>
              {currentLanguage === "en-US" ? "Load More" : "Загрузить еще"}
            </button>
          )}
        </aside>
        <Weather />
      </div>
    </div>
  );
}
