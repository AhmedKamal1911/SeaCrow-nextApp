import { z } from "zod";
import { paginationSchema } from "./shared";
const ticketSchema = z.object({
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
  updatedAt: z.string(),
  publishedAt: z.string(),
  createdAt: z.string(),
});

export const ordersTicketsSchema = z.object({
  data: z.array(ticketSchema),
  meta: paginationSchema,
});
