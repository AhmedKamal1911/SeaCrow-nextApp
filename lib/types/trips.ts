import { z } from "zod";
import {
  imageTypeSchema,
  metaSchema,
  paginationSchema,
  TripsResponseSchema,
  tripSchema,
} from "../validations/shared";

// TypeScript types
export type TripsResponse = z.infer<typeof TripsResponseSchema>;
export type ImageType = z.infer<typeof imageTypeSchema>;
export type Trip = z.infer<typeof tripSchema>;
export type Meta = z.infer<typeof metaSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
