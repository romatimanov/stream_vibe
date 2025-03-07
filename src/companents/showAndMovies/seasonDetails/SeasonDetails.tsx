import { useCurrentLanguage } from "@/hook/useCurrentLanguage";
import style from "./season.module.css";
import { useGetSeasonDetailsQuery } from "@/api/tvDetails";
import Image from "next/image";

type SeasonDetailsProps = {
  tvId?: number;
  season: any;
};

export const SeasonDetails = ({ tvId, season }: SeasonDetailsProps) => {
  const currentLanguage = useCurrentLanguage();

  const { data: seasonData, isLoading } = useGetSeasonDetailsQuery({
    tvId,
    seasonNumber: season.season_number,
    language: currentLanguage,
  });

  if (isLoading)
    return (
      <p className="global-text--small">Загрузка сезона {season.name}...</p>
    );
  if (!currentLanguage) return;

  return (
    <div className={style.season}>
      <ul className={style.episodes}>
        {isLoading ? (
          <p className="global-text--small">Загрузка сезона {season.name}...</p>
        ) : (
          seasonData?.episodes?.map((episode: any) => (
            <li key={episode.id} className={style.episode}>
              <div className={style.episodeNumber}>
                <p className={style.episodeNum}>{episode.episode_number}</p>
                {episode.still_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                    alt={episode.name}
                    className={style.img}
                  />
                )}
              </div>
              <div className="global-text--content">
                <div className={style.runtime}>
                  <h5 className="global-title--small">{episode.name}</h5>
                  <div className={style.time}>
                    <Image src="/time.png" alt="icon" width={15} height={15} />
                    <p>{episode.runtime} min</p>
                  </div>
                </div>
                <p className={`global-text--small ${style.overview}`}>
                  {episode.overview}
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
