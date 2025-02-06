import { z } from "zod";
import { imageTypeSchema } from "../validations/shared";

import {
  tripDataSchema,
  tripsResponseSchema,
} from "../validations/trips-schema";
import { tripItem, tripSchema } from "../validations/trip-schema";

// TypeScript types
export type TripsResponse = z.infer<typeof tripsResponseSchema>;
export type RuleType = z.infer<typeof tripItem>;
export type ImageType = z.infer<typeof imageTypeSchema>;
export type TripData = z.infer<typeof tripDataSchema>;
export type TripDetails = z.infer<typeof tripSchema>;
