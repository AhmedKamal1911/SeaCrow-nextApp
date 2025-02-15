import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { locales } from "@/lib/data";
export const TRIP_SLUG_ALIAS = {
  en: "trips",
  ar: "رحلات",
  ru: "поездки",
} as const;
export const routing = defineRouting({
  // A list of all locales that are supported

  locales: locales,

  // Used when no locale matches
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/contact-us": {
      en: "/contact-us",
      ru: "/контакты",
      ar: "/اتصل-بنا", // Proper Arabic translation
    },
    "/faqs": {
      en: "/faqs",
      ru: "/часто-задаваемые-вопросы",
      ar: "/الأسئلة-الشائعة", // Arabic translation
    },
    "/trips": {
      en: "/trips",
      ru: "/поездки",
      ar: "/رحلات", // Arabic translation
    },
    "/trips/[slug]": {
      en: `/${TRIP_SLUG_ALIAS.en}/[slug]`,
      ru: `/${TRIP_SLUG_ALIAS.ru}/[slug]`,
      ar: `/${TRIP_SLUG_ALIAS.ar}/[slug]`, // Arabic dynamic route
    },
    "/about-us": {
      en: "/about-us",
      ru: "/о-нас",
      ar: "/من-نحن", // Arabic translation
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
