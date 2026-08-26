import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./src/sections/Navbar";
import "./globals.css";
import Footer from "./src/sections/Footer";
import { NavbarVariantProvider } from "./src/context/NavbarVariantContext";

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

// --------------- MetaData and SEO ---------------

export const metadata: Metadata = {
  metadataBase: new URL("https://rawi-academy.vercel.app"),

  title: {
    default: "أكاديمية راوي | منصة تعليمية عربية",
    template: "%s | أكاديمية راوي",
  },
  description:
    "أكاديمية راوي منصة تعليمية عربية تقدّم مسارات تعلّم واضحة في الرياضيات واللغات وغيرها، مصممة لمساعدتك على التقدّم خطوة بخطوة من الأساس إلى الإتقان.",
  keywords: [
    "أكاديمية راوي",
    "منصة تعليمية عربية",
    "تعلم اونلاين",
    "دورات عربية",
    "تعلم الرياضيات",
    "تعلم اللغات",
    "Rawi Academy",
  ],
  authors: [{ name: "أكاديمية راوي" }],
  creator: "أكاديمية راوي",
  publisher: "أكاديمية راوي",

  applicationName: "أكاديمية راوي",
  category: "education",

  icons: {
    icon: "/logos/favicon.png",
    apple: "/logos/favicon.png",
  },

  manifest: "/manifest.json",

  openGraph: {
    type: "website",
    locale: "ar_AR",
    url: "https://rawi-academy.vercel.app",
    siteName: "أكاديمية راوي",
    title: "أكاديمية راوي | منصة تعليمية عربية",
    description:
      "منصة تعليمية عربية تقدّم مسارات تعلّم واضحة في الرياضيات واللغات وغيرها، من الأساس إلى الإتقان.",
    images: [
      {
        url: "/logos/favicon.png",
        width: 512,
        height: 512,
        alt: "أكاديمية راوي",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "أكاديمية راوي | منصة تعليمية عربية",
    description:
      "منصة تعليمية عربية تقدّم مسارات تعلّم واضحة في الرياضيات واللغات وغيرها.",
    images: ["/logos/favicon.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/",
    languages: {
      ar: "/",
    },
  },

  formatDetection: {
    telephone: false,
  },
};

// ------------------------------------------------


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
        <NavbarVariantProvider>
          <Navbar />
          {children}
        </NavbarVariantProvider>
        <Footer />
      </body>
    </html>
  );
}