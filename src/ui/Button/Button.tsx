import style from "./button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  styles?: string;
  onClick?: () => void;
};

export const Button = ({ children, styles, onClick }: ButtonProps) => {
  return (
    <button className={style.button + " " + styles} onClick={onClick}>
      {children}
    </button>
  );
};
