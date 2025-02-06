import { z } from "zod";
import { imageTypeSchema, metaSchema } from "./shared";
export const tripDataSchema = z.object({
  id: z.number(),
  adultPrice: z.number(),
  imgs: z.object({
    data: z.array(imageTypeSchema),
  }),
  locale: z.string(),
  name: z.string(),
  offer: z.number().nullable(),
  slug: z.string(),
  time: z.string(),
  type: z.string(),
});

export const tripsResponseSchema = z.object({
  data: z.array(tripDataSchema),
  meta: metaSchema,
});
