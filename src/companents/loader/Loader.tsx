import style from "./loader.module.css";

export function Loader() {
  return (
    <div className={style.container}>
      <div className={style.loader}></div>
    </div>
  );
}
