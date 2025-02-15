import { Locale } from "@/i18n/routing";

import { tripsResponseSchema } from "../validations/trips-schema";
import { flattenAttributes } from "../utils";

import qs from "qs";
export async function getTripsSectionData(locale: Locale) {
  try {
    // const data = await customFetch({
    //   pathname: "trips",
    //   query: {
    //     populate: {
    //       imgs: "*", // Populate all fields inside imgs
    //     },
    //     fields: [
    //       "id",
    //       "offer",
    //       "adultPrice",
    //       "locale",
    //       "name",
    //       "time",
    //       "slug",
    //       "type",
    //     ],
    //     "pagination[pageSize]": 5,
    //     locale,
    //   },
    //   tags: ["Trip"],
    // });
    // const currentLocale = await getCurrentLocale();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/trips?${qs.stringify({
        populate: {
          imgs: "*", // Populate all fields inside imgs
        },
        fields: [
          "id",
          "offer",
          "adultPrice",
          "locale",
          "name",
          "time",
          "slug",
          "type",
        ],
        "pagination[pageSize]": 4,
        locale,
      })}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok && response.status === 404) {
      return undefined;
    }
    const data = await response.json();

    const result = tripsResponseSchema.safeParse(flattenAttributes(data));

    if (!result.success) {
      // const errorMessage = JSON.stringify(result.error.message, null, 2);
      console.log(result.error);
      throw new Error(
        `trips Section data validation failed please call service`
      );
    }

    return result.data;
  } catch (error) {
    console.error("trips Section data error:", error);
    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
