import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./src/sections/Navbar";
import "./globals.css";
import Footer from "./src/sections/Footer";

const thmanyahSerifDisplay = localFont({
  src: [
    {
      path: "./fonts/thmanyahserifdisplay/thmanyahserifdisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahserifdisplay/thmanyahserifdisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahserifdisplay/thmanyahserifdisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahserifdisplay/thmanyahserifdisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahserifdisplay/thmanyahserifdisplay-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-thmanyah-display",
  display: "swap",
});

const thmanyahSerifText = localFont({
  src: [
    {
      path: "./fonts/thmanyahseriftext/thmanyahseriftext-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahseriftext/thmanyahseriftext-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahseriftext/thmanyahseriftext-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahseriftext/thmanyahseriftext-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahseriftext/thmanyahseriftext-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-thmanyah-text",
});

const thmanyahSans = localFont({
  src: [
    {
      path: "./fonts/thmanyahsans/thmanyahsans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahsans/thmanyahsans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahsans/thmanyahsans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahsans/thmanyahsans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/thmanyahsans/thmanyahsans-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-thmanyah-sans",
});

export const metadata: Metadata = {
  title: "أكاديمية راوي",
  description: "منصة تعليمية عربية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${thmanyahSerifDisplay.variable} ${thmanyahSerifText.variable} ${thmanyahSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
