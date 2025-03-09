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
import { useGetLatestRatesQuery } from "@/api/exchangeApi";

export function NewsContent() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const { data: rates } = useGetLatestRatesQuery("USD");
  const langCode = currentLanguage.split("-")[0];
  const [isExpanded, setIsExpanded] = useState("");
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<NewsArticle[]>([]);

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
    const footer = document.querySelector("footer");
    if (footer) {
      footer.style.display = "block";
      footer.style.visibility = "visible";
    }
    console.log(footer);
  }, []);

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

  const searchExpanded = (value: string) => {
    setIsExpanded(value);
  };

  const filteredRates = rates
    ? Object.entries(rates.rates).filter(([currency]) =>
        currency.toLowerCase().includes(isExpanded.toLowerCase())
      )
    : [];

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
          <div className={style.ratesContent}>
            <ul className={style.rates}>
              <div className={style.search}>
                <input
                  type="text"
                  value={isExpanded}
                  onChange={(e) => searchExpanded(e.target.value)}
                  placeholder={
                    currentLanguage === "en-US"
                      ? "Search currency"
                      : "Поиск валюты"
                  }
                  className={style.input}
                />
              </div>
              {rates &&
                Object.entries(filteredRates).map(([currency, rate]) => (
                  <li key={currency}>
                    <div className={style.rate}>
                      <p className={style.currency}>{rate[0]}</p>
                      <p className={style.currency}>{rate[1]}</p>
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
