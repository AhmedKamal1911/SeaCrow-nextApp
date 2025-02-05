import { z } from "zod";

// Reuse existing schemas from previous definitions
const imageFormatSchema = z.object({
  name: z.string(),
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  path: z.string().nullable(),
  width: z.number(),
  height: z.number(),
  size: z.number(),
  sizeInBytes: z.number(),
  url: z.string(),
});

const imageFormatsSchema = z.object({
  thumbnail: imageFormatSchema,
  small: imageFormatSchema,
  large: imageFormatSchema.optional(),
  medium: imageFormatSchema.optional(),
});

export const imageTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  alternativeText: z.string().nullable(),
  caption: z.string().nullable(),
  width: z.number(),
  height: z.number(),
  formats: imageFormatsSchema.nullable(),
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  size: z.number(),
  url: z.string(),
  previewUrl: z.string().nullable(),
  provider: z.string(),
  provider_metadata: z.unknown().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const highlightSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const tourPlanSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const includedServiceSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const notIncludedSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const dontForgetSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const localizationSchema = z.object({
  id: z.number(),
  name: z.string(),
  time: z.string(),
  departureTime: z.string(),
  tripDays: z.string(),
  returnTime: z.string(),
  maxGuests: z.number(),
  tourFrom: z.string(),
  desc: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  offer: z.number().nullable(),
  adultPrice: z.number(),
  childPrice: z.number(),
  type: z.string(),
  locale: z.string(),
  slug: z.string(),
});

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
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  offer: z.number().nullable(),
  adultPrice: z.number(),
  childPrice: z.number(),
  type: z.string(),
  locale: z.string(),
  slug: z.string(),
  imgs: z.object({
    data: z.array(imageTypeSchema),
  }),
  highlights: z.array(highlightSchema),
  tourPlan: z.array(tourPlanSchema),
  includedServices: z.array(includedServiceSchema),
  notIncluded: z.array(notIncludedSchema),
  dontForget: z.array(dontForgetSchema),
  localizations: z.object({
    data: z.array(localizationSchema),
  }),
});

export const paginationSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
  pageCount: z.number().optional(),
  total: z.number().optional(),
});

export const metaSchema = z.object({
  pagination: paginationSchema,
});

export const tripsResponseSchema = z.object({
  data: z.array(tripSchema),
  meta: metaSchema,
});
