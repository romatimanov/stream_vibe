"use client";
import { useEffect, useState } from "react";
import styles from "./header.module.css";
import Image from "next/image";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { components } from "react-select";
import { customStyles, options } from "./select";
import { useGetSearchMoviesQuery, useGetSearchTvQuery } from "@/api/searchApi";
import { AppDispatch, RootState } from "@/store/store";
import { setInitialActivePage } from "@/store/slice/activePage";
import { setLanguage } from "@/store/slice/languageSlice";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/ui/Button/Button";
import ModalAuth from "../ModalAuth/ModalAuth";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const [isClient, setIsClient] = useState(false);
  const [search, setSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [active, setIsActive] = useState(true);
  const handleClick = () => {
    setIsActive(true);
  };
  const [sessionId, setSessionId] = useState<string | null>(null);

  const menuItems = [
    { path: "/", label: { en: "Home", ru: "Главная" } },
    {
      path: "/movies",
      label: { en: "Movies & Shows", ru: "Фильмы и сериалы" },
    },
    { path: "/support", label: { en: "Support", ru: "Поддержка" } },
    { path: "/news", label: { en: "News", ru: "Новости" } },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
    document.body.classList.remove("hideScroll");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkLocal = localStorage.getItem("sessionId");
      setSessionId(checkLocal);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPage = localStorage.getItem("page") || "home";
      dispatch(setInitialActivePage(storedPage));
    }
  }, []);

  useEffect(() => {
    const updateSession = () => {
      const checkLocal = localStorage.getItem("sessionId");
      setSessionId(checkLocal);
    };

    updateSession();
    window.addEventListener("storage", updateSession);

    return () => {
      window.removeEventListener("storage", updateSession);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("hideScroll");
  };

  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const { data } = useGetSearchMoviesQuery(
    { query: searchQuery, language: currentLanguage },
    { skip: !searchQuery }
  );
  const { data: tv } = useGetSearchTvQuery(
    { query: searchQuery, language: currentLanguage },
    { skip: !searchQuery }
  );

  const searchResults = [...(data?.results || []), ...(tv?.results || [])];

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setIsActive(false);
  };

  const searchClose = () => {
    setSearchQuery("");
    setIsActive(true);
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

  const handleLinkClick = (id: number) => {
    router.push(`/movies/${id}`);
    setSearchQuery("");
    setIsOpen(false);
    document.body.classList.remove("hideScroll");
  };

  const handleLinkTvClick = (id: number) => {
    router.push(`/tv/${id}`);
    setSearchQuery("");
    setIsOpen(false);
    document.body.classList.remove("hideScroll");
  };

  if (!isClient) return null;

  return (
    <header className={`${styles.header} container`}>
      <div
        className={styles.headerContent}
        style={pathname === "/" ? { position: "absolute" } : {}}
      >
        {!isMobile ? (
          <Image
            className={styles.logo}
            src="/Logo.png"
            alt="logo"
            width={200}
            height={60}
            onClick={() => router.push("/")}
          />
        ) : (
          <Image
            className={styles.logo}
            src="/logo-mob.png"
            alt="logo"
            width={116}
            height={35}
            onClick={() => router.push("/")}
          />
        )}
        <nav className={styles.nav}>
          {search ? (
            <div
              className={`${styles.searchContainer} ${
                active ? styles.active : ""
              }`}
            >
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
              {menuItems.map(({ path, label }) => (
                <li
                  key={path}
                  className={`${styles.navItem} ${
                    pathname === path ? styles.active : ""
                  }`}
                  onClick={() => handleNavigation(path)}
                >
                  {label[currentLanguage === "en-US" ? "en" : "ru"]}
                </li>
              ))}
            </ul>
          )}
          {searchQuery && searchResults ? (
            <div className={styles.searchContent}>
              <ul className={styles.searchResults}>
                {searchResults.map((movie) => (
                  <li
                    key={movie.id}
                    className={styles.searchItem}
                    onClick={() =>
                      movie.title
                        ? handleLinkClick(movie.id)
                        : handleLinkTvClick(movie.id)
                    }
                  >
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={"movie"}
                        width={50}
                        height={75}
                      />
                    ) : (
                      <div className={styles.noImage}>Нет изображения</div>
                    )}
                    <span>
                      {movie.title}
                      {movie.name}
                    </span>
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
              <div
                className={`${styles.searchContainer} ${
                  active ? styles.active : ""
                }`}
              >
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
              {searchQuery && searchResults ? (
                <div className={styles.searchContent}>
                  <ul className={styles.searchResults}>
                    {searchResults.map((movie) => (
                      <li
                        key={movie.id}
                        className={styles.searchItem}
                        onClick={() =>
                          movie.title
                            ? handleLinkClick(movie.id)
                            : handleLinkTvClick(movie.id)
                        }
                      >
                        {movie.poster_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={"movie"}
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
                {menuItems.map(({ path, label }) => (
                  <li
                    key={path}
                    className={`${styles.navItem} ${
                      pathname === path ? styles.activeMobile : ""
                    }`}
                    onClick={() => handleNavigation(path)}
                  >
                    {label[currentLanguage === "en-US" ? "en" : "ru"]}
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
              onClick={() => {
                searchClick();
                handleClick();
              }}
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
            <Button
              onClick={() =>
                sessionId ? router.push("/dashboard") : setModalIsOpen(true)
              }
            >
              {!sessionId
                ? currentLanguage === "en-US"
                  ? "Sign In"
                  : "Войти"
                : currentLanguage === "en-US"
                ? "Profile"
                : "Профиль"}
            </Button>
          </div>
        )}
      </div>
      <ModalAuth setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />
    </header>
  );
}
