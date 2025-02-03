import { customFetch } from "../helpers/custom-fetch";
import { TripTicket } from "../types/shared";

export default async function bookTrip(data: TripTicket) {
  try {
    const response = await customFetch(`orders`, undefined, "POST", data);
    // TODO:revalidate path admin
  } catch (error) {
    console.log({ error });
    throw error;
  }
}
