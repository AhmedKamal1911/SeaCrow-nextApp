import { z } from "zod";
import { imageTypeSchema, metaSchema } from "./shared";

export const tripItem = z.object({
  id: z.number(),
  name: z.string(),
});
const tripItemArraySchema = z.array(tripItem);

export const tripSchema = z.object({
  id: z.number(),
  name: z.string(),
  time: z.string(),
  departureTime: z.string(),
  tripDays: z.string(),
  returnTime: z.string(),
  maxGuests: z.number(),
  tourFrom: z.string(),
  desc: z.string(),
  offer: z.number().nullable(),
  adultPrice: z.number(),
  childPrice: z.number(),
  type: z.string(),
  locale: z.string(),
  slug: z.string(),
  imgs: z.object({
    data: z.array(imageTypeSchema),
  }),
  highlights: tripItemArraySchema,
  tourPlan: tripItemArraySchema,
  includedServices: tripItemArraySchema,
  notIncluded: tripItemArraySchema,
  dontForget: tripItemArraySchema,
});
export const tripResponseSchema = z.object({
  data: z.array(tripSchema),
  meta: metaSchema,
});
