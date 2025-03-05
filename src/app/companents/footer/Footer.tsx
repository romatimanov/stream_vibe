"use client";
import { useCurrentLanguage } from "@/app/hook/useCurrentLanguage";
import style from "./footer.module.css";
import Image from "next/image";

export default function Footer() {
  const currentLanguage = useCurrentLanguage();

  if (!currentLanguage) return;
  return (
    <footer className={`${style.footer}`}>
      <div className="container">
        <div className={style.footerContent}>
          <div className={style.footerMenu}>
            <h4 className={style.footerMenuTitle}>
              {currentLanguage === "en-US" ? "Home" : "Главная"}
            </h4>
            <ul className={style.footerList}>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US" ? "Categories" : "Категории"}
                </a>
              </li>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US" ? "Devices" : "Устройства"}
                </a>
              </li>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US" ? "Pricing" : "Цены"}
                </a>
              </li>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US"
                    ? "FAQ"
                    : "Часто задаваемые вопросы"}
                </a>
              </li>
            </ul>
          </div>
          <div className={style.footerMenu}>
            <h4 className={style.footerMenuTitle}>
              {currentLanguage === "en-US" ? "Movies" : "Фильмы"}
            </h4>
            <ul className={style.footerList}>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US" ? "Genres" : "Жанры"}
                </a>
              </li>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US" ? "Trending" : "Популярные"}
                </a>
              </li>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US" ? "New" : "Новые"}
                </a>
              </li>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US" ? "Release" : "Выпуск"}
                </a>
              </li>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US" ? "Popular" : "Популярные"}
                </a>
              </li>
            </ul>
          </div>
          <div className={style.footerMenu}>
            <h4 className={style.footerMenuTitle}>
              {currentLanguage === "en-US" ? "Shows" : "Шоу"}
            </h4>
            <ul className={style.footerList}>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US" ? "Genres" : "Жанры"}
                </a>
              </li>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US" ? "Trending" : "Популярные"}
                </a>
              </li>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US" ? "New" : "Новые"}
                </a>
              </li>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US" ? "Release" : "Выпуск"}
                </a>
              </li>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US" ? "Popular" : "Популярные"}
                </a>
              </li>
            </ul>
          </div>
          <div className={style.footerMenu}>
            <h4 className={style.footerMenuTitle}>
              {currentLanguage === "en-US" ? "Support" : "Поддержка"}
            </h4>
            <ul className={style.footerList}>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US"
                    ? "Contact Us"
                    : "Связаться с нами"}
                </a>
              </li>
            </ul>
          </div>
          <div className={style.footerMenu}>
            <h4 className={style.footerMenuTitle}>
              {currentLanguage === "en-US" ? "Subscription" : "Подписка"}
            </h4>
            <ul className={style.footerList}>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US" ? "Plans" : "План"}
                </a>
              </li>
              <li>
                <a href="#" className={style.footerLink}>
                  {currentLanguage === "en-US" ? "Features" : "Функции"}
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
          <p className={style.copyText}>@2023 streamvib, All Rights Reserved</p>
          <div className={style.copyContent}>
            <p className={style.copyLink}>Terms of Use</p>
            <p className={style.copyLink}>Privacy Policy</p>
            <p className={style.copyLink}>Cookie Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
