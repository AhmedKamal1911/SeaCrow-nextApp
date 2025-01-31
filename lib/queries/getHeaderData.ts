import { customFetch } from "../helpers/custom-fetch";
import {
  HeaderDataSchemaTypes,
  navbarDataSchema,
} from "../validations/headerDataValidation";

export async function getHeaderData() {
  try {
    const data: HeaderDataSchemaTypes = await customFetch("global", {
      populate: "logoText,navLinks",
    });

    const result = navbarDataSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = JSON.stringify(result.error.flatten(), null, 2);
      throw new Error(`Header data validation failed: ${errorMessage}`);
    }
    console.log({ header: data });
    return result.data;
  } catch (error) {
    console.error("Header data error:", error);

    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
