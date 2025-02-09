import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue, Cairo, Audiowide, Playwrite_CO } from "next/font/google";

import Header from "@/components/common/header";
import ScrollToTopButton from "@/components/common/scroll-to-top-button";
import SocialContainer from "@/components/common/social-container";
import Footer from "@/components/common/footer";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getHeaderData } from "@/lib/queries/getHeaderData";
import { getFooterData } from "@/lib/queries/getFooterData";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";
import { ReactNode } from "react";
import ReactQueryProvider from "@/providers/query-client-provier";
import { Toaster } from "@/components/ui/toaster";

const bebasNeueFont = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: ["400"],
  subsets: ["latin"],
  fallback: ["sans-serif", "Arial"], // Specify fallback fonts
  style: "normal",
  display: "swap",
  preload: true,
});

const audioWideFont = Audiowide({
  variable: "--font-audio-wide",
  weight: ["400"],
  subsets: ["latin"],
  fallback: ["sans-serif", "Arial"], // Specify fallback fonts
  style: "normal",
  display: "swap",
});

const playWriteCoFont = Playwrite_CO({
  variable: "--font-playwrite-co",
  weight: ["400", "300", "200"],
  fallback: ["Arial", "sans-serif"], // Specify fallback fonts
  style: "normal",
  display: "swap",
});
const cairoFont = Cairo({
  variable: "--font-cairo",
  weight: ["400", "600", "700"],
  fallback: ["Arial", "sans-serif"], // Specify fallback fonts
  subsets: ["arabic"],
  style: "normal",
  display: "swap",
});
// app/[locale]/about-us/page.jsx

// This page will now be pre-rendered for these 3 locales
export const metadata: Metadata = {
  title: "Sea Crow - Discover the Best of Hurghada, Red Sea",
  description:
    "Explore breathtaking Red Sea adventures in Hurghada with Sea Crow. From diving and snorkeling to luxury cruises and desert safaris, experience the best of Egypt's coastal paradise.",
};
export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  // setRequestLocale(locale);
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages: AbstractIntlMessages = await getMessages();

  const headerData = await getHeaderData();
  const footerData = await getFooterData();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${bebasNeueFont.variable} ${audioWideFont.variable}  ${playWriteCoFont.variable} ${cairoFont.variable}`}
    >
      {/* ${geistMono.variable} */}
      <body className={`antialiased min-h-screen `}>
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            <Header data={headerData} />
            {children}
            <Footer data={footerData} />
            <Toaster />
            <ScrollToTopButton />
            <SocialContainer />
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
