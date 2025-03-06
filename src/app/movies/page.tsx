import { About } from "@/companents/movies/about/About";
import { Films } from "@/companents/movies/films/Films";
import ClientProvider from "@/providers/ClientProvider";

export default function Movies() {
  return (
    <ClientProvider>
      <About />
      <Films />
    </ClientProvider>
  );
}
