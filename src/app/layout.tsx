"use client";

import ClientProvider from "@/providers/ClientProvider";
import Footer from "../companents/footer/Footer";
import Header from "../companents/header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html lang="ru">
      <body>
        <QueryClientProvider client={queryClient}>
          <ClientProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ClientProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
