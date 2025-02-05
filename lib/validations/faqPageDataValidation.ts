import { z } from "zod";

// FAQ Item Schema
const FaqItemSchema = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
});

// Localization Data Schema
const LocalizationDataSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  locale: z.string().nullable(),
});

// Localizations Schema
const LocalizationsSchema = z.object({
  data: z.array(LocalizationDataSchema),
});

// Meta Schema (extendable if needed)
const MetaSchema = z.object({}).catchall(z.unknown());

// Main Schema
export const FaqsPageSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  locale: z.enum(["en", "ru", "ar"]),
  faqsList: z.array(FaqItemSchema),
  localizations: LocalizationsSchema,
  meta: MetaSchema.optional(),
});

// Type Definitions
export type FaqItem = z.infer<typeof FaqItemSchema>;
// type LocalizationData = z.infer<typeof LocalizationDataSchema>;
// type Localizations = z.infer<typeof LocalizationsSchema>;
// type Meta = z.infer<typeof MetaSchema>;
export type FaqsPageDataType = z.infer<typeof FaqsPageSchema>;
