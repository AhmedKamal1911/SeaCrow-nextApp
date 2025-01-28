import { customFetch } from "../helpers/custom-fetch";
import { Trip } from "../types/trips";

export async function getSpeicalOffersData() {
  const data: { data: Trip[]; meta: {} } = await customFetch("trips", {
    populate: "*",
    filters: {
      offer: {
        $ne: null,
      },
    },
  });
  console.log({ data });
  return data;
}
