import { customFetch } from "../helpers/custom-fetch";
import { Trip } from "../types/trips";

export async function getTripsSectionData(typeName: string) {
  const data: Trip[] = await customFetch("why-us-section", {
    populate: "*",
    ...(typeName !== "all"
      ? {
          filters: {
            type: {
              $eq: typeName,
            },
          },
        }
      : {}),
  });
  console.log({ data });
  return data;
}
