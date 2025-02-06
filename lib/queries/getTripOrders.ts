import { customFetch } from "../helpers/custom-fetch";
import { ordersTicketsSchema } from "../validations/orders-tickets-schema";

export async function getTripOrders(token: string) {
  try {
    const data = await customFetch({
      pathname: "orders",
      token: `Bearer ${token}`,
    });

    const result = ordersTicketsSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = JSON.stringify(result.error.name, null, 2);
      console.log(result.error);
      throw new Error(`Orders Tickets data Error: ${errorMessage}`);
    }

    return result.data.data;
  } catch (error) {
    console.error("Orders Tickets data error:", error);
    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
