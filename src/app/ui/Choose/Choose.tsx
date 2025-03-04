"use client";
import { useCurrentLanguage } from "@/app/hook/useCurrentLanguage";
import { Button } from "../Button/Button";
import style from "./choose.module.css";

type ChooseProps = {
  styles?: string;
  title: string;
  text: string;
  price: string;
  plan: string;
};

export const Choose = ({ styles, title, text, price, plan }: ChooseProps) => {
  const currentLanguage = useCurrentLanguage();

  if (!currentLanguage) return;
  return (
    <div className={`${style.choose} ${styles}`}>
      <div className={style.textContent}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.text}>{text}</p>
      </div>
      <p className={style.priceContent}>
        <span className={style.price}>{price}</span>
        {plan}
      </p>
      <div className={style.btnGroup}>
        <button className={style.btn}>
          {currentLanguage == "en-US"
            ? "Start Free Trial"
            : "Попробовать бесплатно"}
        </button>
        <Button styles={style.btnRed}>
          {currentLanguage == "en-US" ? "Choose Plan" : "Выбрать план"}
        </Button>
      </div>
    </div>
  );
};
