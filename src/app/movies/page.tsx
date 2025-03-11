import Movies from "@/companents/movies/movies/Movies";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Movies />
    </Suspense>
  );
}
