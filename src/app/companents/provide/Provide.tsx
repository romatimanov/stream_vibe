"use client";
import style from "./provide.module.css";
import { Device } from "@/app/ui/Device/Device";
import { useCurrentLanguage } from "@/app/hook/useCurrentLanguage";

export default function Provide() {
  const currentLanguage = useCurrentLanguage();

  if (!currentLanguage) return;

  const deviseData = [
    {
      id: 1,
      icon: "device/1.png",
      title: currentLanguage == "en-US" ? "Smartphones" : "Смартфоны",
      text:
        currentLanguage == "en-US"
          ? "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
          : "StreamVibe оптимизирован для смартфонов Android и iOS. Загрузите наше приложение из Google Play Store или Apple App Store",
    },
    {
      id: 2,
      icon: "device/2.png",
      title: currentLanguage == "en-US" ? "Tablets" : "Планшеты",
      text:
        currentLanguage == "en-US"
          ? "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
          : "StreamVibe оптимизирован для смартфонов Android и iOS. Загрузите наше приложение из Google Play Store или Apple App Store",
    },
    {
      id: 3,
      icon: "device/3.png",
      title: currentLanguage == "en-US" ? "Smart TV" : "Smart TV",
      text:
        currentLanguage == "en-US"
          ? "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
          : "StreamVibe оптимизирован для смартфонов Android и iOS. Загрузите наше приложение из Google Play Store или Apple App Store",
    },
    {
      id: 4,
      icon: "device/4.png",
      title: currentLanguage == "en-US" ? "Laptops" : "Ноутбуки",
      text:
        currentLanguage == "en-US"
          ? "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
          : "StreamVibe оптимизирован для смартфонов Android и iOS. Загрузите наше приложение из Google Play Store или Apple App Store",
    },
    {
      id: 5,
      icon: "device/4.png",
      title:
        currentLanguage == "en-US" ? "Gaming Consoles" : "Игровые приставки",
      text:
        currentLanguage == "en-US"
          ? "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
          : "StreamVibe оптимизирован для смартфонов Android и iOS. Загрузите наше приложение из Google Play Store или Apple App Store",
    },
    {
      id: 6,
      icon: "device/4.png",
      title: currentLanguage == "en-US" ? "VR Headsets " : "VR Очки",
      text:
        currentLanguage == "en-US"
          ? "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
          : "StreamVibe оптимизирован для смартфонов Android и iOS. Загрузите наше приложение из Google Play Store или Apple App Store",
    },
  ];

  return (
    <section className={`${style.provide} container`}>
      <div className={`${style.provideTextContent} global-text--content`}>
        <h2 className="global-title">
          {currentLanguage == "en-US"
            ? "We Provide you streaming experience across various devices."
            : "Мы предоставляем вам возможность потоковой передачи на различных устройствах"}
        </h2>
        <p className="global-text">
          {currentLanguage == "en-US"
            ? "With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere. Our platform is designed to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment."
            : "С StreamVibe вы можете наслаждаться любимыми фильмами и телешоу в любое время и в любом месте. Наша платформа разработана для совместимости с широким спектром устройств, гарантируя, что вы никогда не пропустите ни одного момента развлечений."}
        </p>
      </div>
      <div className={style.provideContent}>
        {deviseData.map((device) => (
          <Device
            key={device.id}
            icon={device.icon}
            title={device.title}
            text={device.text}
          />
        ))}
      </div>
    </section>
  );
}
