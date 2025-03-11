"use client";
import { useCurrentLanguage } from "@/hook/useCurrentLanguage";
import style from "./footer.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SmartLink } from "../smartLink/SmartLink";

export default function Footer() {
  const currentLanguage = useCurrentLanguage();
  const route = useRouter();

  if (!currentLanguage) return;
  return (
    <div className={`${style.footer}`}>
      <div className="container">
        <div className={style.footerContent}>
          <div className={style.footerMenu}>
            <h4 className={style.footerMenuTitle}>
              {currentLanguage === "en-US" ? "Home" : "Главная"}
            </h4>
            <ul className={style.footerList}>
              <li>
                <SmartLink
                  to="/"
                  scrollTo="categories"
                  className={style.footerLink}
                >
                  {currentLanguage === "en-US" ? "Categories" : "Категории"}
                </SmartLink>
              </li>
              <li>
                <SmartLink
                  to="/"
                  scrollTo="devices"
                  className={style.footerLink}
                >
                  {currentLanguage === "en-US" ? "Devices" : "Устройства"}
                </SmartLink>
              </li>
              <li>
                <SmartLink
                  to="/"
                  scrollTo="pricing"
                  className={style.footerLink}
                >
                  {currentLanguage === "en-US" ? "Pricing" : "Цены"}
                </SmartLink>
              </li>
              <li>
                <SmartLink
                  to="/"
                  scrollTo="qestion"
                  className={style.footerLink}
                >
                  {currentLanguage === "en-US"
                    ? "FAQ"
                    : "Часто задаваемые вопросы"}
                </SmartLink>
              </li>
            </ul>
          </div>
          <div className={style.footerMenu}>
            <h4 className={style.footerMenuTitle}>
              {currentLanguage === "en-US" ? "Movies" : "Фильмы"}
            </h4>
            <ul className={style.footerList}>
              <li>
                <SmartLink
                  to="/movies"
                  scrollTo="genres"
                  type="movie"
                  className={style.footerLink}
                >
                  {currentLanguage === "en-US" ? "Genres" : "Жанры"}
                </SmartLink>
              </li>
              <li>
                <SmartLink
                  to="/movies"
                  scrollTo="now"
                  type="movie"
                  className={style.footerLink}
                >
                  {currentLanguage === "en-US"
                    ? "Now Watching"
                    : "Сейчас смотрят"}
                </SmartLink>
              </li>
              <li>
                <SmartLink
                  to="/movies"
                  type="movie"
                  scrollTo="trending"
                  className={style.footerLink}
                >
                  {currentLanguage === "en-US" ? "Trending" : "Популярные"}
                </SmartLink>
              </li>
              <li>
                <SmartLink
                  to="/movies"
                  scrollTo="upcoming"
                  type="movie"
                  className={style.footerLink}
                >
                  {currentLanguage === "en-US" ? "Upcoming" : "Скоро"}
                </SmartLink>
              </li>
            </ul>
          </div>
          <div className={style.footerMenu}>
            <h4 className={style.footerMenuTitle}>
              {currentLanguage === "en-US" ? "Shows" : "Шоу"}
            </h4>
            <ul className={style.footerList}>
              <li>
                <SmartLink
                  to="/movies"
                  scrollTo="tvPopular"
                  type="tv"
                  className={style.footerLink}
                >
                  {currentLanguage === "en-US" ? "Popular" : "Популярные"}
                </SmartLink>
              </li>
              <li>
                <SmartLink
                  to="/movies"
                  scrollTo="tvTop"
                  type="tv"
                  className={style.footerLink}
                >
                  {currentLanguage === "en-US" ? "Top Series" : "Топ сериалы"}
                </SmartLink>
              </li>
              <li>
                <SmartLink
                  to="/movies"
                  type="tv"
                  scrollTo="tvToday"
                  className={style.footerLink}
                >
                  {currentLanguage === "en-US"
                    ? "Now Airing"
                    : "Сейчас в эфире"}
                </SmartLink>
              </li>
            </ul>
          </div>
          <div className={style.footerMenu}>
            <h4 className={style.footerMenuTitle}>
              {currentLanguage === "en-US" ? "Support" : "Поддержка"}
            </h4>
            <ul className={style.footerList}>
              <li>
                <a
                  href="#"
                  className={style.footerLink}
                  onClick={() => route.push("/support")}
                >
                  {currentLanguage === "en-US"
                    ? "Contact Us"
                    : "Связаться с нами"}
                </a>
              </li>
            </ul>
          </div>
          <div className={style.footerMenu}>
            <h4 className={style.footerMenuTitle}>
              {currentLanguage === "en-US" ? "News" : "Новости"}
            </h4>
            <ul className={style.footerList}>
              <li>
                <a
                  href="#"
                  className={style.footerLink}
                  onClick={() => route.push("/news")}
                >
                  {currentLanguage === "en-US" ? "News" : "Новости"}
                </a>
              </li>
            </ul>
          </div>
          <div className={style.footerMenu}>
            <h4 className={style.footerMenuTitle}>
              {currentLanguage === "en-US"
                ? "Connect With Us"
                : "Свяжитесь с нами"}
            </h4>
            <div className={style.social}>
              <div className={style.icon}>
                <Image
                  src={"/face.png"}
                  alt="facebook"
                  width={24}
                  height={24}
                />
              </div>
              <div className={style.icon}>
                <Image
                  src={"/twit.png"}
                  alt="facebook"
                  width={24}
                  height={24}
                />
              </div>
              <div className={style.icon}>
                <Image
                  src={"/link.png"}
                  alt="facebook"
                  width={24}
                  height={24}
                />{" "}
              </div>
            </div>
          </div>
        </div>
        <div className={style.copy}>
          <p className={style.copyText}>@2025 streamvib, All Rights Reserved</p>
          <div className={style.copyContent}>
            <p className={style.copyLink}>Terms of Use</p>
            <p className={style.copyLink}>Privacy Policy</p>
            <p className={style.copyLink}>Cookie Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
