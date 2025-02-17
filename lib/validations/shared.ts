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

export const paginationSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
  pageCount: z.number().optional(),
  total: z.number().optional(),
});

export const metaSchema = z.object({
  pagination: paginationSchema,
});

export const SEOSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  openGraph: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    url: z.string(),
    siteName: z.string(),
    images: z.object({ data: z.array(imageTypeSchema) }),
  }),
});

export const questionItemSchema = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
});

export const metaObject = z.object({}).catchall(z.unknown());

export const questionsListSchema = z.array(questionItemSchema);
