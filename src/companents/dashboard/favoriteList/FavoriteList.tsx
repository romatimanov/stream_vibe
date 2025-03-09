"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loader } from "@/companents/loader/Loader";
import { RootState } from "@/store/store";
import style from "./watchList.module.css";
import { MovieCard } from "@/ui/MovieCard/MovieCard";
import { useRouter } from "next/navigation";
import { useGetFavoriteMoviesQuery } from "@/api/favoriteListApi";

export function FavoriteList() {
  const [accountId, setAccountId] = useState<string | null>(null);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const route = useRouter();

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("sessionId");
      localStorage.removeItem("requestToken");
    }
    route.push("/");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAccountId(localStorage.getItem("accountId") || "");
    }
  }, []);

  const { data: favoriteList, isLoading } = useGetFavoriteMoviesQuery({
    language: currentLanguage,
    account_id: accountId || "",
  });

  if (isLoading) return <Loader />;
  return (
    <div className={style.watch}>
      <h1>Твой favoriteList:</h1>
      <div className={style.content}>
        {favoriteList?.results.length ? (
          favoriteList.results?.map((movie: any) => (
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
              ? "Empty favorite list"
              : "Пустой список избранного"}
          </p>
        )}
      </div>
    </div>
  );
}
