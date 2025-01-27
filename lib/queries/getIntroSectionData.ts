import { IntroSectionData } from "@/app/components/sections/intro-section";
import { customFetch } from "../helpers/custom-fetch";

export async function getIntroSectionData() {
  const data: IntroSectionData = await customFetch("intro-section", {
    populate: {
      featuresBox: {
        populate: {
          icon: true,
          travelImg: true,
        },
      },
    },
  });
  console.log({ data });
  return data;
}
