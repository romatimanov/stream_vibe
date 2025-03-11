"use client";
import { useCurrentLanguage } from "@/hook/useCurrentLanguage";
import { Button } from "../Button/Button";
import style from "./choose.module.css";
import ModalAuth from "@/companents/ModalAuth/ModalAuth";
import { useState } from "react";

type ChooseProps = {
  styles?: string;
  title: string;
  text: string;
  price: string;
  plan: string;
};

export const Choose = ({ styles, title, text, price, plan }: ChooseProps) => {
  const currentLanguage = useCurrentLanguage();
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
        <button className={style.btn} onClick={() => setModalIsOpen(true)}>
          {currentLanguage == "en-US"
            ? "Start Free Trial"
            : "Попробовать бесплатно"}
        </button>
        <Button styles={style.btnRed} onClick={() => setModalIsOpen(true)}>
          {currentLanguage == "en-US" ? "Choose Plan" : "Выбрать план"}
        </Button>
      </div>
      <ModalAuth setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />
    </div>
  );
};
