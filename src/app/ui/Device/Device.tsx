import style from "./device.module.css";

type DeviceProps = {
  title: string;
  icon: string;
  text: string;
};

export const Device = ({ title, icon, text }: DeviceProps) => {
  return (
    <div className={style.device}>
      <div className={style.deviceContent}>
        <div className={style.deviceIcon}>
          <img src={`/${icon}`} alt={title} />
        </div>
        <h3 className={style.title}>{title}</h3>
      </div>
      <p className={style.text}>{text}</p>
    </div>
  );
};
