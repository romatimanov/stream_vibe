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
import { useResize } from "@/app/hook/useResize";

export default function Header() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const [isClient, setIsClient] = useState(false);
  const [search, setSearch] = useState(false);
  const isMobile = useResize(768);

  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const searchClick = () => {
    setSearch((prevState) => !prevState);
  };

  useEffect(() => {
    setIsClient(true);
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

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  if (!isClient) return null;

  return (
    <header className={`${styles.header} container`}>
      <div className={styles.headerContent}>
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
            <input
              type="text"
              placeholder={
                currentLanguage === "en-US"
                  ? "Type to search"
                  : "Введите для поиска"
              }
              className={styles.search}
            />
          ) : (
            <ul className={styles.navList}>
              {(currentLanguage === "en-US"
                ? ["Home", "Movies & Shows", "Support", "Subscriptions"]
                : ["Главная", "Фильмы и сериалы", "Поддержка", "Подписки"]
              ).map((item, index) => (
                <li
                  key={index}
                  className={`${styles.navItem} ${
                    activeIndex === index ? styles.active : ""
                  }`}
                  onClick={() => handleClick(index)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </nav>
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
      </div>
    </header>
  );
}
