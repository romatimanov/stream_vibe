"use client";
import { Provider } from "react-redux";
import "./globals.css";
import { store } from "./store/store";
import Header from "./companents/header/Header";
import Footer from "./companents/footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
