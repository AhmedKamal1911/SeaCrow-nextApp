import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported

  locales: ["en", "ar", "ru"],

  // Used when no locale matches
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/contact-us": {
      en: "/contact-us",
      ru: "/контакты", // Proper Russian translation
      ar: "/contact-us",
    },
    "/faqs": {
      en: "/faqs",
      ru: "/часто-задаваемые-вопросы",
      ar: "/faqs",
    },
    "/trips": {
      en: "/trips",
      ru: "/поездки",
      ar: "/trips",
    },
    "/about-us": {
      en: "/about-us",
      ru: "/о-нас", // Correct Russian translation
      ar: "/about-us",
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
