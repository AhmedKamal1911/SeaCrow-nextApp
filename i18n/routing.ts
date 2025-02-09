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
      en: "/trips/[slug]",
      ru: "/поездки/[slug]",
      ar: "/رحلات/[slug]", // Arabic dynamic route
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
