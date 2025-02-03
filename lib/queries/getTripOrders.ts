import { customFetch } from "../helpers/custom-fetch";
import { ordersTicketsSchema } from "../validations/ordersTicketsDataValidation";

export async function getTripOrders(token: string) {
  try {
    const data = await customFetch("trips", {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });
    console.log({ data });
    const result = ordersTicketsSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = JSON.stringify(
        result.error.flatten().fieldErrors,
        null,
        2
      );
      console.log(result.error);
      throw new Error(`Orders Tickets data validation failed: ${errorMessage}`);
    }
    console.log("fromgettrip", { data });
    return result.data;
  } catch (error) {
    console.error("Orders Tickets data error:", error);
    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
