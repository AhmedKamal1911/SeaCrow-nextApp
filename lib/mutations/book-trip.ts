import { customFetch } from "../helpers/custom-fetch";
import { TripTicket } from "../types/shared";

export default async function bookTrip(data: TripTicket) {
  try {
    const response = await customFetch({
      pathname: `orders`,
      query: undefined,
      method: "POST",
      body: { data },
    });
  } catch (error) {
    console.log({ error });
    throw error;
  }
}
