import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/Header";
import ThemeColoursComponent from "./ThemeColoursComponent";
import { ColourProvider } from "./ColourContext";
export const metadata: Metadata = {
  title: "Mathemagical",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <body className="min-h-screen flex flex-col">
        <ColourProvider>
          <Header />
          {children}
          <ThemeColoursComponent />
        </ColourProvider>
      </body>
    </html>
  );
}