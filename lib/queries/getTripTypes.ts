import { customFetch } from "../helpers/custom-fetch";
import { tripsResponseSchema } from "../validations/trips-schema";

export default async function getTripTypes() {
  // TODO:create relation to get trips types fast
  try {
    const data = await customFetch({
      pathname: "trips",
      query: {
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
      },
    });
    const result = tripsResponseSchema.safeParse(data);

    if (!result.success) {
      const errorMessage = JSON.stringify(result.error.flatten(), null, 2);
      console.log(result.error.errors);
      throw new Error(`TripsTypes data validation failed: ${errorMessage}`);
    }
    const set = [...new Set(result.data.data.map((trip) => trip.type))];

    const uniqueTripTypes = [...set, "all"];
    return uniqueTripTypes;
  } catch (error) {
    console.error("TripsTypes data error:", error);
    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
