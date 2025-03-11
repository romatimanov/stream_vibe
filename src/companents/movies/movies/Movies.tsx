"use client";

import { About } from "@/companents/movies/about/About";
import { Films } from "@/companents/movies/films/Films";
import ClientProvider from "@/providers/ClientProvider";
import { Suspense } from "react";

export default function Movies() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <ClientProvider>
        <About />
        <Films />
      </ClientProvider>
    </Suspense>
  );
}
