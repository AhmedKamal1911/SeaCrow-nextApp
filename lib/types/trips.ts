import { z } from "zod";
import {
  imageTypeSchema,
  metaSchema,
  paginationSchema,
  tripsResponseSchema,
  tripSchema,
  dontForgetSchema,
} from "../validations/shared";

// TypeScript types
export type TripsResponse = z.infer<typeof tripsResponseSchema>;
export type RuleType = z.infer<typeof dontForgetSchema>;
export type ImageType = z.infer<typeof imageTypeSchema>;
export type Trip = z.infer<typeof tripSchema>;
export type Meta = z.infer<typeof metaSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
