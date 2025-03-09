"use client";

import Image from "next/image";
import style from "./aboutFims.module.css";
import { Button } from "@/ui/Button/Button";
import { useAddWatchMutation } from "@/api/addWatchApi";
import { useAddFavoriteMutation } from "@/api/addFavoriteApi";
import { useGetWatchMoviesQuery } from "@/api/watchListApi";
import { useAddWatch } from "@/hook/useAddWatch";
import { useAddFavorite } from "@/hook/useAddFavorite";
import { useGetFavoriteMoviesQuery } from "@/api/favoriteListApi";
import { useEffect, useState } from "react";

type AboutFilmsProps = {
  isLoading: boolean;
  isImageLoaded: boolean;
  data: any;
  currentLanguage: string;
  setModalIsOpen: (isOpen: boolean) => void;
  setIsImageLoaded: (loaded: boolean) => void;
};

export function AboutFims({
  isLoading,
  isImageLoaded,
  data,
  currentLanguage,
  setModalIsOpen,
  setIsImageLoaded,
}: AboutFilmsProps) {
  const [addWatchMutation] = useAddWatchMutation();
  const [addFavoriteMutation] = useAddFavoriteMutation();
  const [isWatch, setIsWatch] = useState(new Set<number>());
  const [isFavorite, setIsFavorite] = useState(new Set<number>());
  const accountId =
    typeof window !== "undefined"
      ? localStorage.getItem("accountId") || ""
      : "";
  const { data: watch, refetch } = useGetWatchMoviesQuery({
    language: currentLanguage,
    account_id: accountId,
  });
  const { data: favorite, refetch: refetchFavorite } =
    useGetFavoriteMoviesQuery({
      language: currentLanguage,
      account_id: accountId,
    });

  useEffect(() => {
    if (watch?.results) {
      setIsWatch(new Set(watch.results.map((film) => film.id)));
    }
  }, [watch]);

  useEffect(() => {
    if (favorite?.results) {
      setIsFavorite(new Set(favorite.results.map((film) => film.id)));
      console.log(favorite);
    }
  }, [favorite]);

  return (
    <>
      {isLoading ? (
        <div className={style.loading}>Загрузка...</div>
      ) : (
        <div className={style.content}>
          {isImageLoaded && (
            <div className={style.aboutFilm}>
              <div className="global-text--content">
                <h1 className="global-title">
                  {data?.name} {data?.title}
                </h1>
                <h2 className={`${style.filmText} global-text`}>
                  {data?.overview}
                </h2>
              </div>

              <div className={style.btnGroup}>
                <Button
                  styles={style.previewButton}
                  onClick={() => setModalIsOpen(true)}
                >
                  <Image src="/play.png" alt="play" width={17} height={19} />
                  {currentLanguage === "en-US" ? "Play Now" : "Смотреть сейчас"}
                </Button>
                <div className={style.filmButtons}>
                  <button
                    className={style.filmButton}
                    onClick={() =>
                      useAddWatch(data.id, addWatchMutation, refetch)
                    }
                  >
                    {!isWatch.has(data.id) ? (
                      <Image
                        src="/plus.png"
                        alt="plus"
                        width={17}
                        height={19}
                      />
                    ) : (
                      <Image
                        src="/plus-active.svg"
                        alt="plus"
                        width={17}
                        height={19}
                      />
                    )}
                  </button>
                  <button
                    className={style.filmButton}
                    onClick={() =>
                      useAddFavorite(
                        data.id,
                        addFavoriteMutation,
                        refetchFavorite
                      )
                    }
                  >
                    {!isFavorite.has(data.id) ? (
                      <Image
                        src="/like.png"
                        alt="plus"
                        width={17}
                        height={19}
                      />
                    ) : (
                      <Image
                        src="/like-active.svg"
                        alt="plus"
                        width={17}
                        height={19}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className={style.contentImage}>
            <img
              className={style.poster}
              src={`https://image.tmdb.org/t/p/w1920/${data?.backdrop_path}`}
              alt="movieDetails"
              onLoad={() => setIsImageLoaded(true)}
              style={{ display: isImageLoaded ? "block" : "loading" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
