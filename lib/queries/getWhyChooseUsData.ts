import { WhyUsData } from "@/app/components/sections/why-choose-us-section";
import { customFetch } from "../helpers/custom-fetch";

export async function getWhyChooseUsData() {
  const data: WhyUsData = await customFetch("why-us-section", {
    populate: "*",
  });
  console.log({ data });
  return data;
}
