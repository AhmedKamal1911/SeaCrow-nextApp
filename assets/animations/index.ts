export { default as loadingAnimationData } from "@/assets/animations/loading.json";
export { default as dotsLoader } from "@/assets/animations/dots-loading.json";

// Errors
import NotFoundAnimationData from "@/assets/animations/not-found.json";
import errorAnimationData from "@/assets/animations/error.json";
import tripNotFoundAnimation from "@/assets/animations/trip-not-found-animation.json";
export const ERROR_ANIMATIONS = {
  trip: tripNotFoundAnimation,
  notFound: NotFoundAnimationData,
  global: errorAnimationData,
};
