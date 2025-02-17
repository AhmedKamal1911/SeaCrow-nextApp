import { Locale } from "@/i18n/routing";
import { customFetch } from "../helpers/custom-fetch";
import { tripResponseSchema } from "../validations/trip-schema";

export default async function getTripData({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  try {
    const data = await customFetch({
      pathname: "trips",
      query: {
        populate: {
          imgs: "*", // Populate all fields inside imgs
          dontForget: "*",
          highlights: "*",
          includedServices: "*",
          notIncluded: "*",
          tourPlan: "*",
        },
        fields: [
          "adultPrice",
          "childPrice",
          "departureTime",
          "desc",
          "id",
          "locale",
          "maxGuests",
          "name",
          "offer",
          "returnTime",
          "slug",
          "time",
          "tourFrom",
          "tripDays",
          "type",
        ],
        filters: {
          slug: {
            $eq: slug,
          },
        },
        locale,
      },
      cache: "force-cache",
    });

    const result = tripResponseSchema.safeParse(data);
    if (!result.success) {
      // const errorMessage = JSON.stringify(
      //   result.error.flatten().fieldErrors,
      //   null,
      //   2
      // );
      throw new Error(`Trip data validation failed please call service`);
    }
    return result?.data.data[0];
  } catch (error) {
    throw error;
  }
}
