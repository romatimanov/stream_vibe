export function useSubscriptionDataMount(currentLanguage: any) {
  return [
    {
      title: currentLanguage === "en-US" ? "Basic Plan" : "Базовый",
      text:
        currentLanguage === "en-US"
          ? "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles."
          : "Наслаждайтесь обширной библиотекой фильмов и шоу, включающей разнообразный контент, включая недавно вышедшие фильмы.",
      price: currentLanguage === "en-US" ? "$9.99" : "$9.99",
      plan: currentLanguage === "en-US" ? " /month" : " /мес",
    },
    {
      title: currentLanguage === "en-US" ? "Standard Plan" : "Стандартный",
      text:
        currentLanguage === "en-US"
          ? "Access to a wider selection of movies and shows, including most new releases and exclusive content"
          : "Доступ к более широкому выбору фильмов и шоу, включая большинство новинок и эксклюзивный контент",
      price: currentLanguage === "en-US" ? "$12.99" : "$12.99",
      plan: currentLanguage === "en-US" ? " /month" : " /мес",
    },
    {
      title: currentLanguage === "en-US" ? "Premium Plan" : "Премиум",
      text:
        currentLanguage === "en-US"
          ? "Access to a widest selection of movies and shows, including all new releases and Offline Viewing"
          : "Доступ к широчайшему выбору фильмов и шоу, включая все новинки и возможность просмотра офлайн",
      price: currentLanguage === "en-US" ? "$14.99" : "$14.99",
      plan: currentLanguage === "en-US" ? " /month" : " /мес",
    },
  ];
}

export function useSubscriptionDataYears(currentLanguage: any) {
  return [
    {
      title: currentLanguage === "en-US" ? "Basic Plan" : "Базовый",
      text:
        currentLanguage === "en-US"
          ? "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles."
          : "Наслаждайтесь обширной библиотекой фильмов и шоу, включающей разнообразный контент, включая недавно вышедшие фильмы.",
      price: currentLanguage === "en-US" ? "$40.99" : "$40.99",
      plan: currentLanguage === "en-US" ? " /year" : " /год",
    },
    {
      title: currentLanguage === "en-US" ? "Standard Plan" : "Стандартный",
      text:
        currentLanguage === "en-US"
          ? "Access to a wider selection of movies and shows, including most new releases and exclusive content"
          : "Доступ к более широкому выбору фильмов и шоу, включая большинство новинок и эксклюзивный контент",
      price: currentLanguage === "en-US" ? "$69.99" : "$69.99",
      plan: currentLanguage === "en-US" ? " /year" : " /год",
    },
    {
      title: currentLanguage === "en-US" ? "Premium Plan" : "Премиум",
      text:
        currentLanguage === "en-US"
          ? "Access to a widest selection of movies and shows, including all new releases and Offline Viewing"
          : "Доступ к широчайшему выбору фильмов и шоу, включая все новинки и возможность просмотра офлайн",
      price: currentLanguage === "en-US" ? "$99.99" : "$99.99",
      plan: currentLanguage === "en-US" ? " /year" : " /год",
    },
  ];
}
