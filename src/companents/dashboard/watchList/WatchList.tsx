"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetWatchMoviesQuery } from "@/api/watchListApi";
import { Loader } from "@/companents/loader/Loader";
import { RootState } from "@/store/store";
import style from "./watchList.module.css";
import { MovieCard } from "@/ui/MovieCard/MovieCard";
import { useRouter } from "next/navigation";

export function WatchList() {
  const [accountId, setAccountId] = useState<string | null>(null);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const route = useRouter();

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("sessionId");
      localStorage.removeItem("requestToken");
      window.dispatchEvent(new Event("storage"));
    }
    route.push("/");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAccountId(localStorage.getItem("accountId") || "");
    }
  }, []);

  const { data: watchlist, isLoading } = useGetWatchMoviesQuery({
    language: currentLanguage,
    account_id: accountId || "",
  });

  if (isLoading) return <Loader />;
  return (
    <div className={style.watch}>
      <div className={style.header}>
        <h1>Твой Watchlist:</h1>
        <button className={style.logout} onClick={logout}>
          Выйти
        </button>
      </div>
      <div className={style.content}>
        {watchlist?.results.length ? (
          watchlist.results?.map((movie: any) => (
            <MovieCard
              onClick={() => route.push(`/movies/${movie.id}`)}
              key={movie.id}
              img={movie.poster_path}
              rating={movie.vote_average}
              view={movie.vote_count}
            />
          ))
        ) : (
          <p className="global-text">
            {currentLanguage === "en-US"
              ? "Empty watch list"
              : "Пустой список просмотренных"}
          </p>
        )}
      </div>
    </div>
  );
}
