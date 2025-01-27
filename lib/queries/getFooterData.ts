import { FooterData } from "@/components/common/footer";
import { customFetch } from "../helpers/custom-fetch";

export async function getFooterData() {
  const data: FooterData = await customFetch("global", {
    populate: "navLinks,contactLinks",
  });
  console.log({ data });
  return data;
}
