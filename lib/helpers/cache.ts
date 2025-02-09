export type CacheKey =
  (typeof CACHE_KEY_MODEL_MAP)[keyof typeof CACHE_KEY_MODEL_MAP];

export type StrapiModel = keyof typeof CACHE_KEY_MODEL_MAP;

export const CACHE_KEY_MODEL_MAP = {
  trip: "Trip",
  "faq-page": "FAQ",
  global: "Global",
  "hero-section": "Hero",
  "intro-section": "Intro",
  "trip-question": "Questions",
  "why-us-section": "WhyUs",
} as const;
