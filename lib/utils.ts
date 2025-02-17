import { format, isValid, parse } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getLocale } from "next-intl/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function flattenAttributes<T extends Record<string, unknown>>(
  data: T
): T {
  if (
    typeof data !== "object" ||
    data === null ||
    data instanceof Date ||
    typeof data === "function"
  ) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => flattenAttributes(item)) as unknown as T;
  }

  const flattened: Record<string, unknown> = {};

  for (const key in data as Record<string, unknown>) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) continue;

    if (
      (key === "attributes" || key === "data") &&
      typeof (data as Record<string, unknown>)[key] === "object" &&
      !Array.isArray(data[key])
    ) {
      Object.assign(
        flattened,
        flattenAttributes(data[key] as Record<string, unknown>)
      );
    } else {
      flattened[key] = flattenAttributes(data[key] as Record<string, unknown>);
    }
  }

  return flattened as T;
}

function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_BASE_URL as string;
}

export function getStrapiMediaURL(url: string) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}

export function getTimingSystem(time: string) {
  if (!time) return "N/A"; // Handle undefined or null time values

  const parsedTime = parse(time, "HH:mm:ss.SSS", new Date());
  if (isValid(parsedTime)) {
    return format(parsedTime, "a"); // 'a' returns AM or PM
  } else {
    return "Invalid Time";
  }
}

export function formatTime(time: string) {
  if (!time) return "N/A"; // Handle undefined or null time values

  const parsedTime = parse(time, "HH:mm:ss.SSS", new Date());
  if (isValid(parsedTime)) {
    return format(parsedTime, "hh:mm");
  } else {
    return "Invalid Time";
  }
}

export async function getCurrentLocale() {
  return typeof window === "undefined"
    ? await getLocale()
    : new URL(location.href).pathname.split("/")[1];
}
