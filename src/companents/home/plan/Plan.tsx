"use client";

import style from "./plan.module.css";
import { useState } from "react";
import { useSubscriptionDataMount, useSubscriptionDataYears } from "./data";
import { useCurrentLanguage } from "@/hook/useCurrentLanguage";
import { Choose } from "@/ui/Choose/Choose";

export default function Plan({ id }: { id: string }) {
  const currentLanguage = useCurrentLanguage();

  const [activeBtn, setActiveBtn] = useState<number>(0);

  const handleClickAtctive = (index: number) => {
    setActiveBtn(index);
  };

  if (!currentLanguage) return;
  return (
    <section className={`${style.plan} container`} id={id}>
      <div className={style.planTextContent}>
        <div className="global-text--content">
          <h2 className="global-title">
            {currentLanguage == "en-US"
              ? "Choose the plan that's right for you"
              : "Выберите план, который подходит вам"}
          </h2>
          <p className="globla-text">
            {currentLanguage == "en-US"
              ? "Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!"
              : "Присоединяйтесь к StreamVibe и выберите из наших гибких опций подписки, отличных для вашего просмотра. Готовьтесь к нестандартному развлечению!"}
          </p>
        </div>
        <div className={style.chooseGroup}>
          {(currentLanguage === "en-US"
            ? ["Monthly", "Yearly"]
            : ["Месячно", "Годовое"]
          ).map((item, index) => (
            <button
              key={index}
              className={`${style.btn} ${
                activeBtn === index ? style.btnActive : ""
              }`}
              onClick={() => handleClickAtctive(index)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className={style.choosePlan}>
        {activeBtn === 0
          ? useSubscriptionDataMount(currentLanguage).map(
              (item: any, index: number) => (
                <Choose
                  key={index}
                  title={item.title}
                  text={item.text}
                  price={item.price}
                  plan={item.plan}
                />
              )
            )
          : useSubscriptionDataYears(currentLanguage).map(
              (item: any, index: number) => (
                <Choose
                  key={index}
                  title={item.title}
                  text={item.text}
                  price={item.price}
                  plan={item.plan}
                />
              )
            )}
      </div>
    </section>
  );
}
