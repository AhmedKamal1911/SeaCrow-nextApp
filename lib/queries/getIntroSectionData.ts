import { customFetch } from "../helpers/custom-fetch";
import { introSectionSchemaData } from "../validations/introSectionDataValidation";

export async function getIntroSectionData() {
  try {
    const response = await customFetch("intro-section", {
      populate: {
        featuresBox: {
          populate: {
            icon: true,
            travelImg: true,
          },
        },
      },
    });
    console.log({ response });
    const result = introSectionSchemaData.safeParse(response);
    if (!result.success) {
      const errorMessage = JSON.stringify(
        result.error.flatten().fieldErrors,
        null,
        2
      );
      console.log(result.error.flatten());
      throw new Error(`IntroSection data validation failed: ${errorMessage}`);
    }
    // console.log({ data: result.data });
    return result.data;
  } catch (error) {
    console.error("introSection data error:", error);
    // Optional: Return fallback data or re-throw
    throw error; // Remove this if you want to suppress the error
  }
}
