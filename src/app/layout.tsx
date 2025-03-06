import ClientProvider from "@/providers/ClientProvider";
import Footer from "../companents/footer/Footer";
import Header from "../companents/header/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <ClientProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
