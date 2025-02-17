import { customFetch } from "../helpers/custom-fetch";
import { TripTicket } from "../types/shared";

export default async function bookTrip(data: TripTicket) {
  try {
    await customFetch({
      pathname: `orders`,
      query: undefined,
      method: "POST",
      body: { data },
    });
  } catch (error) {
    throw error;
  }
}
