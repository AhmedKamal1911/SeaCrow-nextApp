import { z } from "zod";

export const ordersTicketsSchema = z.array(
  z.object({
    email: z.string(),
    message: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    hotelName: z.string(),
    adultCount: z.number(),
    childCount: z.number(),
    babiesCount: z.number(),
    checkDate: z.string(), // Changed from date to string
    country: z.string(),
    tripSlug: z.string(),
  })
);
