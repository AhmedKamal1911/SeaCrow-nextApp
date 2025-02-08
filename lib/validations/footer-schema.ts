import { z } from "zod";
import { metaObject } from "./shared";
import { pathnames } from "../data";

const contactLinksSchema = z.array(
  z.object({
    id: z.number(),
    url: z.string(),
    text: z.string(),
    type: z.enum(["mail", "tel"]),
  })
);

const navLinksSchema = z.array(
  z.object({
    id: z.number(),
    text: z.string(),
    url: z.enum(pathnames),
    isExternal: z.boolean(),
  })
);

export const footerDataSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  logoText: z.string(),
  locale: z.string(),
  navLinks: navLinksSchema,
  contactLinks: contactLinksSchema,
  meta: metaObject,
});

// Optional: Create inferred TypeScript type from Zod schema
export type FooterDataSchemaTypes = z.infer<typeof footerDataSchema>;
