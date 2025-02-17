import { z } from "zod";
import { customFetch } from "../helpers/custom-fetch";
import { metaSchema } from "../validations/shared";

export default async function getAllTripsSlugs() {
  const data = await customFetch({
    pathname: "trips",
    query: {
      locale: "en",
      fields: ["id", "slug", "updatedAt"],
    },
  });

  const result = z
    .object({
      data: z.array(
        z.object({ id: z.number(), slug: z.string(), updatedAt: z.string() })
      ),
      meta: metaSchema,
    })
    .safeParse(data);
  if (!result.success) {
    throw new Error("Failed to generate static params for trips/:slug page");
  }

  return result.data.data;
}
