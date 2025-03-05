"use client";

import { HomePage } from "./pages/home/HomePage";
import { useSelector } from "react-redux";
import { Movies } from "./pages/movies/Movies.tsx";

export default function Home() {
  const activePage = useSelector((state: any) => state.activePage.activePage);

  return (
    <>
      {activePage === "home" && <HomePage />}
      {activePage === "movies" && <Movies />}
    </>
  );
}
