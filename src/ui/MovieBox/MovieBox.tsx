import Image from "next/image";
import style from "./movieBox.module.css";

interface MovieBoxProps {
  title: string;
  children: React.ReactNode;
}

export const MovieBox = ({ title, children }: MovieBoxProps) => {
  return (
    <div className={style.movieBox}>
      {children}
      <div className={style.content}>
        <h3 className={style.title}>{title}</h3>
        <Image
          className={style.arrow}
          src="/arrow.png"
          alt="arrow"
          width={18}
          height={16}
        />
      </div>
    </div>
  );
};
