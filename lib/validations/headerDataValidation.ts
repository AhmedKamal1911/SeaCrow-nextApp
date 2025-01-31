import { z } from "zod";

// NavLinks schema (reusable if needed)
const navLinksSchema = z.array(
  z.object({
    id: z.number(),
    text: z.string(),
    url: z.string(),
    isExternal: z.boolean(),
  })
);

// Main NavbarData schema
export const navbarDataSchema = z.object({
  id: z.number(),
  createdAt: z.string(), // Consider using z.date() if you want to parse to Date objects
  updatedAt: z.string(),
  publishedAt: z.string(),
  logoText: z.string(),
  locale: z.string(),
  navLinks: navLinksSchema,
  meta: z.object({}).catchall(z.unknown()),
});

// Optional inferred type
export type HeaderDataSchemaTypes = z.infer<typeof navbarDataSchema>;
