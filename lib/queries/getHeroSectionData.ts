import { HeroSectionData } from "@/app/[locale]/components/sections/hero-section";
import { customFetch } from "../helpers/custom-fetch";

export async function getHeroSectionData() {
  const data: HeroSectionData = await customFetch("hero-section", {
    populate: "*",
  });
  console.log({ data });
  return data;
}
