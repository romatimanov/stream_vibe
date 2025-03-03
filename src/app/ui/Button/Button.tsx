import style from "./button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  styles?: string;
};

export const Button = ({ children, styles }: ButtonProps) => {
  return <button className={style.button + " " + styles}>{children}</button>;
};
