import Image from "next/image";
import style from "./aboutFims.module.css";
import { Button } from "@/ui/Button/Button";

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
                  <button className={style.filmButton}>
                    <Image src="/plus.png" alt="plus" width={17} height={19} />
                  </button>
                  <button className={style.filmButton}>
                    <Image src="/like.png" alt="like" width={17} height={19} />
                  </button>
                  <button className={style.filmButton}>
                    <Image
                      src="/volume.png"
                      alt="volume"
                      width={17}
                      height={19}
                    />
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
