"use client";
import { useLocale } from "next-intl";

export default function useIsRTL() {
  const isRTL = useLocale() === "ar";
  return isRTL;
}
