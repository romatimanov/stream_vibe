"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./supportInfo.module.css";
import { useGetPopularMoviesQuery } from "@/api/previewApi";
import { RootState } from "@/store/store";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/ui/Button/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Loader } from "@/companents/loader/Loader";

const schema = z.object({
  firstName: z.string().min(2, "Имя должно быть не короче 2 символов"),
  lastName: z.string().min(2, "Имя должно быть не короче 2 символов"),
  email: z.string().email("Неверный формат email"),
  phone: z.string().min(6, "Телефон должен быть не короче 6 символов"),
  message: z.string().min(10, "Сообщение должно быть не короче 10 символов"),
  checkbox: z.literal(true, {
    errorMap: () => ({
      message: "Вы должны согласиться с условиями",
    }),
  }),
});

export function SupportInfo() {
  const languageFromStore = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const [currentLanguage, setCurrentLanguage] = useState<string | null>(null);
  const handleChange = (value: string) => {
    console.log("Selected phone:", value);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    setCurrentLanguage(languageFromStore);
  }, [languageFromStore]);

  const { data, isLoading } = useGetPopularMoviesQuery({
    language: currentLanguage ?? "en-US",
    page: 2,
  });

  if (isLoading) return <Loader />;
  if (!currentLanguage) return null;

  return (
    <div className={`${style.supportInfo} container`}>
      <div className={style.supportInfoWrapper}>
        <div className={style.supportInfoContent}>
          <div className="global-text--content">
            <h1 className="global-title">
              {currentLanguage === "en-US"
                ? "Welcome to our support page!"
                : "Добро пожаловать на нашу страницу поддержки!"}
            </h1>
            <h2 className="global-text">
              {currentLanguage === "en-US"
                ? "We're here to help you with any problems you may be having with our product."
                : "Мы здесь, чтобы помочь вам с любыми проблемами, которые могут возникнуть с нашим продуктом."}
            </h2>
          </div>
          <div className={style.supportInfoImg}>
            {data?.results?.map((movie: any, index: number) => (
              <img
                key={`${movie.id}-${index}`}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={style.img}
              />
            ))}
          </div>
        </div>
        <div className={style.fromContent}>
          <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.inputGroupWrapper}>
              <div className={style.inputGroup}>
                <label className={style.label} htmlFor="firstName">
                  {currentLanguage === "en-US" ? "First Name" : "Введите Имя"}
                </label>
                <input
                  className={`${style.input} ${
                    errors.firstName ? style.error : ""
                  }`}
                  {...register("firstName")}
                  placeholder={
                    currentLanguage === "en-US"
                      ? "Enter First Name"
                      : "Введите Имя"
                  }
                />
              </div>

              <div className={style.inputGroup}>
                <label className={style.label} htmlFor="email">
                  {currentLanguage === "en-US" ? "Email" : "Электронная почта"}
                </label>
                <input
                  className={`${style.input} ${
                    errors.email ? style.error : ""
                  }`}
                  {...register("email")}
                  placeholder={
                    currentLanguage === "en-US"
                      ? "Enter Email"
                      : "Электронная почта"
                  }
                />
              </div>
            </div>

            <div className={style.inputGroupWrapper}>
              <div className={style.inputGroup}>
                <label className={style.label} htmlFor="lastName">
                  {currentLanguage === "en-US" ? "Last Name" : "Фамилия"}
                </label>
                <input
                  className={`${style.input} ${
                    errors.lastName ? style.error : ""
                  }`}
                  {...register("lastName")}
                  placeholder={
                    currentLanguage === "en-US"
                      ? "Enter Last Name"
                      : "Введите Фамилию"
                  }
                />
              </div>

              <div className={style.inputGroup}>
                <label className={style.label} htmlFor="phone">
                  {currentLanguage === "en-US" ? "Phone Number" : "Телефон"}
                </label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Введите номер телефона",
                    minLength: {
                      value: 6,
                      message: "Телефон слишком короткий",
                    },
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      country={"ru"}
                      enableSearch={false}
                      inputClass={`${style.input} ${
                        errors.phone ? style.error : ""
                      }`}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </div>
            </div>
            <div className={style.inputGroup}>
              <label className={style.label} htmlFor="message">
                {currentLanguage === "en-US" ? "Message" : "Сообщение"}
              </label>
              <textarea
                className={`${style.input} ${style.textarea} ${
                  errors.message ? style.error : ""
                }`}
                {...register("message")}
                placeholder={
                  currentLanguage === "en-US"
                    ? "Enter Message"
                    : "Введите Сообщение"
                }
              />
              {errors.message && <p>{errors.message.message}</p>}
            </div>
            <div className={style.checkbox}>
              <div className={style.check}>
                <input
                  id="checkbox"
                  type="checkbox"
                  className={`${style.inputCheck} ${
                    errors.checkbox ? style.error : ""
                  }`}
                  {...register("checkbox")}
                />
                <label className="global-text" htmlFor="checkbox">
                  {currentLanguage === "en-US"
                    ? "I agree with Terms of Use and Privacy Policy"
                    : "Я согласен на обработку персональных данных"}
                </label>
              </div>
              <Button>
                {currentLanguage === "en-US"
                  ? "Send Message"
                  : "Отправить сообщение"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
