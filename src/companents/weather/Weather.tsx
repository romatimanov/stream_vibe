"use client";

import { useEffect, useState } from "react";
import { useGetWeatherByCoordsQuery } from "@/api/weatherApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import style from "./weather.module.css";

export function Weather() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const langCode = currentLanguage.split("-")[0];

  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState<string>("");
  const [timeClass, setTimeClass] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const formattedTime = new Intl.DateTimeFormat(currentLanguage, {
        hour: "2-digit",
        minute: "2-digit",
      }).format(now);
      setTime(formattedTime);

      // ✅ Определяем класс (день или ночь)
      if (hours >= 6 && hours < 18) {
        setTimeClass(style.day);
      } else {
        setTimeClass(style.night);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [currentLanguage]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          setError(
            "Не удалось получить геолокацию. Используйте поиск по городу."
          );
          console.error("Ошибка геолокации:", err);
        }
      );
    } else {
      setError("Геолокация не поддерживается в вашем браузере.");
    }
  }, []);

  const { data, isLoading } = useGetWeatherByCoordsQuery(
    coords
      ? { lat: coords.lat, lon: coords.lon, language: langCode }
      : { lat: 0, lon: 0, language: langCode },
    { skip: !coords }
  );

  return (
    <div className={`${style.weather} ${timeClass}`}>
      {error && <p>{error}</p>}
      {isLoading && <p>Загрузка...</p>}
      {data && coords && (
        <div className={style.content}>
          <div className={style.header}>
            <h3 className={style.city}>
              {data.location.name}, {data.location.country}
            </h3>
            <p className={style.time}>{time}</p>
          </div>
          <p>{data.current.condition.text}</p>
          <p>
            🌡 {currentLanguage === "en-US" ? "Temperature" : "Температура"}{" "}
            {data.current.temp_c}°C
          </p>
          <p>
            🌡 {currentLanguage === "en-US" ? "Feels Like" : "Ощущается как"}{" "}
            {data.current.feelslike_c}°C
          </p>
          <p>
            💨 {currentLanguage === "en-US" ? "Wind" : "Ветер"}{" "}
            {data.current.wind_kph} км/ч
          </p>
          <p>
            💧 {currentLanguage === "en-US" ? "Humidity" : "Влажность"}{" "}
            {data.current.humidity}%
          </p>
        </div>
      )}
    </div>
  );
}
