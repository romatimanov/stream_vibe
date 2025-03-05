"use client";
import { useEffect, useState } from "react";
import styles from "./header.module.css";
import Image from "next/image";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { setLanguage } from "@/app/store/slice/languageSlice";
import { components } from "react-select";
import { customStyles, options } from "./select";
import { useGetSearchMoviesQuery } from "@/api/searchApi";
import {
  setActivePage,
  setInitialActivePage,
} from "@/app/store/slice/activePage";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const [isClient, setIsClient] = useState(false);
  const [search, setSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activePage = useSelector(
    (state: RootState) => state.activePage.activePage
  );

  const menuItems = {
    home: {
      en: "Home",
      ru: "Главная",
    },
    movies: {
      en: "Movies & Shows",
      ru: "Фильмы и сериалы",
    },
    support: {
      en: "Support",
      ru: "Поддержка",
    },
    subscriptions: {
      en: "Subscriptions",
      ru: "Подписки",
    },
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPage = localStorage.getItem("page") || "Home";
      dispatch(setInitialActivePage(storedPage));
    }
  }, []);

  const handleActivePage = (page: string) => {
    dispatch(setActivePage(page));
    if (typeof window !== "undefined") {
      localStorage.setItem("page", page);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("hideScroll");
  };

  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const { data, error, isLoading } = useGetSearchMoviesQuery(
    { query: searchQuery, language: currentLanguage },
    { skip: !searchQuery }
  );

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const searchClose = () => {
    setSearchQuery("");
  };

  const searchClick = () => {
    setSearch((prevState) => !prevState);
  };

  useEffect(() => {
    setIsClient(true);

    const updateSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width < 920);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const customDropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <Image
          src="/globe.svg"
          alt="globe"
          width={20}
          height={20}
          className={styles.arrow}
        />
      </components.DropdownIndicator>
    );
  };

  const handleLanguageChange = (selectedOption: any) => {
    dispatch(setLanguage(selectedOption.value));
  };

  if (!isClient) return null;

  return (
    <header className={`${styles.header} container`}>
      <div
        className={styles.headerContent}
        style={activePage === "home" ? { position: "absolute" } : {}}
      >
        {!isMobile ? (
          <Image
            className={styles.logo}
            src="/Logo.png"
            alt="logo"
            width={200}
            height={60}
          />
        ) : (
          <Image
            className={styles.logo}
            src="/logo-mob.png"
            alt="logo"
            width={116}
            height={35}
          />
        )}
        <nav className={styles.nav}>
          {search ? (
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder={
                  currentLanguage === "en-US"
                    ? "Type to search"
                    : "Введите для поиска"
                }
                className={styles.search}
                value={searchQuery}
                onChange={handleSearchInput}
              />
              <span onClick={searchClose} className={styles.menuIconSearch}>
                +
              </span>
            </div>
          ) : (
            <ul className={styles.navList}>
              {Object.entries(menuItems).map(([key, labels]) => (
                <li
                  key={key}
                  className={`${styles.navItem} ${
                    activePage === key ? styles.active : ""
                  }`}
                  onClick={() => handleActivePage(key)}
                >
                  {labels[currentLanguage === "en-US" ? "en" : "ru"]}
                </li>
              ))}
            </ul>
          )}
          {searchQuery && data?.results ? (
            <div className={styles.searchContent}>
              <ul className={styles.searchResults}>
                {data.results.map((movie) => (
                  <li key={movie.id} className={styles.searchItem}>
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        width={50}
                        height={75}
                      />
                    ) : (
                      <div className={styles.noImage}>Нет изображения</div>
                    )}
                    <span>{movie.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : searchQuery ? (
            <p className={styles.noResults}>Ничего не найдено</p>
          ) : null}
        </nav>
        {isTablet ? (
          <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
            <div className={styles.menuBurger}>
              <div
                className={`${styles.menuIcon} ${isOpen ? styles.open : ""}`}
                onClick={toggleMenu}
              >
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className={styles.menuContent}>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  placeholder={
                    currentLanguage === "en-US"
                      ? "Type to search"
                      : "Введите для поиска"
                  }
                  className={styles.search}
                  value={searchQuery}
                  onChange={handleSearchInput}
                />
                <span onClick={searchClose} className={styles.menuIconSearch}>
                  +
                </span>
              </div>
              {searchQuery && data?.results ? (
                <div className={styles.searchContent}>
                  <ul className={styles.searchResults}>
                    {data.results.map((movie) => (
                      <li key={movie.id} className={styles.searchItem}>
                        {movie.poster_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            width={50}
                            height={75}
                          />
                        ) : (
                          <div className={styles.noImage}>Нет изображения</div>
                        )}
                        <span>{movie.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : searchQuery ? (
                <p className={styles.noResults}>Ничего не найдено</p>
              ) : null}
              <ul className={styles.navList}>
                {(currentLanguage == "en-US"
                  ? ["Home", "Movies & Shows", "Support", "Subscriptions"]
                  : ["Главная", "Фильмы и сериалы", "Поддержка", "Подписки"]
                ).map((item, index) => (
                  <li key={index} className={styles.navItem}>
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.icons}>
                <Select
                  options={options}
                  value={options.find((opt) => opt.value === currentLanguage)}
                  onChange={handleLanguageChange}
                  styles={customStyles}
                  components={{ DropdownIndicator: customDropdownIndicator }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.icons}>
            <Image
              className={styles.icon}
              src="/search.png"
              alt="search"
              width={18}
              height={18}
              onClick={searchClick}
            />
            <Image
              className={styles.icon}
              src="/unn.png"
              alt="search"
              width={18}
              height={18}
            />
            <Select
              options={options}
              value={options.find((opt) => opt.value === currentLanguage)}
              onChange={handleLanguageChange}
              styles={customStyles}
              components={{ DropdownIndicator: customDropdownIndicator }}
            />
          </div>
        )}
      </div>
    </header>
  );
}
