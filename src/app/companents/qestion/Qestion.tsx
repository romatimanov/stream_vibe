"use client";
import { useCurrentLanguage } from "@/app/hook/useCurrentLanguage";
import style from "./question.module.css";
import { Button } from "@/app/ui/Button/Button";
import * as Accordion from "@radix-ui/react-accordion";

export default function Qestion() {
  const currentLanguage = useCurrentLanguage();

  if (!currentLanguage) return;
  return (
    <section className={`${style.qestion} container`}>
      <div className={style.qestionTextContent}>
        <div className="global-text--content">
          <h2 className="global-title">
            {currentLanguage == "en-US"
              ? "Frequently Asked Questions"
              : "Часто задаваемые вопросы"}
          </h2>
          <p className="globla-text">
            {currentLanguage == "en-US"
              ? "Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe."
              : "Есть вопросы? У нас есть ответы! Ознакомьтесь с разделом FAQ, чтобы найти ответы на самые распространенные вопросы о StreamVibe."}
          </p>
        </div>
        <Button>
          {currentLanguage == "en-US" ? "Ask a Question" : "Задать вопрос"}
        </Button>
      </div>
      <div className={style.accContent}>
        <div className={style.accList}>
          <Accordion.Root
            className={style.accordionRoot}
            type="single"
            collapsible
          >
            <Accordion.Item className={style.accordionItem} value="item-1">
              <Accordion.Trigger className={style.accordionTrigger}>
                <div className={style.accGroup}>
                  <div className={style.number}>01</div>
                  <h3 className={style.accTitle}>
                    {currentLanguage === "en-US"
                      ? "What is StreamVibe?"
                      : "Что такое StreamVibe?"}
                  </h3>
                </div>
              </Accordion.Trigger>
              <Accordion.Content className={style.accordionContent}>
                <p className="global-text">
                  {currentLanguage === "en-US"
                    ? "StreamVibe is a streaming service that allows you to watch movies and shows on demand."
                    : "StreamVibe — это потоковый сервис, позволяющий смотреть фильмы и шоу по запросу."}
                </p>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item className={style.accordionItem} value="item-2">
              <Accordion.Trigger className={style.accordionTrigger}>
                <div className={style.accGroup}>
                  <div className={style.number}>02</div>
                  <h3 className={style.accTitle}>
                    {currentLanguage === "en-US"
                      ? "How much does StreamVibe cost?"
                      : "Сколько стоит StreamVibe?"}
                  </h3>
                </div>
              </Accordion.Trigger>
              <Accordion.Content className={style.accordionContent}>
                <p className="global-text">
                  {currentLanguage === "en-US"
                    ? "StreamVibe is a streaming service that allows you to watch movies and shows on demand."
                    : "StreamVibe — это потоковый сервис, позволяющий смотреть фильмы и шоу по запросу."}
                </p>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item className={style.accordionItem} value="item-3">
              <Accordion.Trigger className={style.accordionTrigger}>
                <div className={style.accGroup}>
                  <div className={style.number}>03</div>
                  <h3 className={style.accTitle}>
                    {currentLanguage === "en-US"
                      ? "How much does StreamVibe cost?"
                      : "Сколько стоит StreamVibe?"}
                  </h3>
                </div>
              </Accordion.Trigger>
              <Accordion.Content className={style.accordionContent}>
                <p className="global-text">
                  {currentLanguage === "en-US"
                    ? "StreamVibe is a streaming service that allows you to watch movies and shows on demand."
                    : "StreamVibe — это потоковый сервис, позволяющий смотреть фильмы и шоу по запросу."}
                </p>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item className={style.accordionItem} value="item-4">
              <Accordion.Trigger className={style.accordionTrigger}>
                <div className={style.accGroup}>
                  <div className={style.number}>04</div>
                  <h3 className={style.accTitle}>
                    {currentLanguage === "en-US"
                      ? "How can I watch StreamVibe?"
                      : "Как я могу смотреть StreamVibe?"}
                  </h3>
                </div>
              </Accordion.Trigger>
              <Accordion.Content className={style.accordionContent}>
                <p className="global-text">
                  {currentLanguage === "en-US"
                    ? "StreamVibe is a streaming service that allows you to watch movies and shows on demand."
                    : "StreamVibe — это потоковый сервис, позволяющий смотреть фильмы и шоу по запросу."}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </div>
        <div className={style.accList}>
          <Accordion.Root
            className={style.accordionRoot}
            type="single"
            collapsible
          >
            <Accordion.Item className={style.accordionItem} value="item-1">
              <Accordion.Trigger className={style.accordionTrigger}>
                <div className={style.accGroup}>
                  <div className={style.number}>05</div>
                  <h3 className={style.accTitle}>
                    {currentLanguage === "en-US"
                      ? "How do I sign up for StreamVibe?"
                      : "Как я могу зарегистрироваться в StreamVibe?"}
                  </h3>
                </div>
              </Accordion.Trigger>
              <Accordion.Content className={style.accordionContent}>
                <p className="global-text">
                  {currentLanguage === "en-US"
                    ? "StreamVibe is a streaming service that allows you to watch movies and shows on demand."
                    : "StreamVibe — это потоковый сервис, позволяющий смотреть фильмы и шоу по запросу."}
                </p>
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item className={style.accordionItem} value="item-2">
              <Accordion.Trigger className={style.accordionTrigger}>
                <div className={style.accGroup}>
                  <div className={style.number}>06</div>
                  <h3 className={style.accTitle}>
                    {currentLanguage === "en-US"
                      ? "What is the StreamVibe free trial?"
                      : "Что такое бесплатная пробная версия StreamVibe?"}
                  </h3>
                </div>
              </Accordion.Trigger>
              <Accordion.Content className={style.accordionContent}>
                <p className="global-text">
                  {currentLanguage === "en-US"
                    ? "StreamVibe is a streaming service that allows you to watch movies and shows on demand."
                    : "StreamVibe — это потоковый сервис, позволяющий смотреть фильмы и шоу по запросу."}
                </p>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item className={style.accordionItem} value="item-3">
              <Accordion.Trigger className={style.accordionTrigger}>
                <div className={style.accGroup}>
                  <div className={style.number}>07</div>
                  <h3 className={style.accTitle}>
                    {currentLanguage === "en-US"
                      ? "How do I contact StreamVibe customer support?"
                      : "Как я могу связаться с поддержкой StreamVibe?"}
                  </h3>
                </div>
              </Accordion.Trigger>
              <Accordion.Content className={style.accordionContent}>
                <p className="global-text">
                  {currentLanguage === "en-US"
                    ? "StreamVibe is a streaming service that allows you to watch movies and shows on demand."
                    : "StreamVibe — это потоковый сервис, позволяющий смотреть фильмы и шоу по запросу."}
                </p>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item className={style.accordionItem} value="item-4">
              <Accordion.Trigger className={style.accordionTrigger}>
                <div className={style.accGroup}>
                  <div className={style.number}>08</div>
                  <h3 className={style.accTitle}>
                    {currentLanguage === "en-US"
                      ? "What are the StreamVibe payment methods?"
                      : "Какие методы оплаты StreamVibe?"}
                  </h3>
                </div>
              </Accordion.Trigger>
              <Accordion.Content className={style.accordionContent}>
                <p className="global-text">
                  {currentLanguage === "en-US"
                    ? "StreamVibe is a streaming service that allows you to watch movies and shows on demand."
                    : "StreamVibe — это потоковый сервис, позволяющий смотреть фильмы и шоу по запросу."}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}
