import { customFetch } from "../helpers/custom-fetch";
import { TripsResponseSchema } from "../validations/shared";

export default async function getTripTypes() {
  // TODO:create relation to get trips types fast
  try {
    const data = await customFetch("trips", {
      populate: "*",
    });
    const result = TripsResponseSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = JSON.stringify(result.error.flatten(), null, 2);
      throw new Error(`TripsTypes data validation failed: ${errorMessage}`);
    }
    console.log({ data });
    const set = [...new Set(result.data.data.map((trip) => trip.type))];

    const uniqueTripTypes = [...set, "all"];
    return uniqueTripTypes;
  } catch (error) {
    console.error("TripsTypes data error:", error);
    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
