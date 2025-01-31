import { customFetch } from "../helpers/custom-fetch";
import {
  FaqsPageDataType,
  FaqsPageSchema,
} from "../validations/faqPageDataValidation";

export default async function getFaqPageData() {
  try {
    const data: FaqsPageDataType = await customFetch("faq-page", {
      populate: "*",
    });
    console.log({ faq: data });
    const result = FaqsPageSchema.safeParse(data);
    if (!result.success) {
      const errorMessage = JSON.stringify(result.error, null, 2);
      throw new Error(`Faq page data validation failed: ${errorMessage}`);
    }
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
