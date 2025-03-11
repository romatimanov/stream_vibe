import HomePage from "@/companents/home/home/Home";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <HomePage />
    </Suspense>
  );
}
