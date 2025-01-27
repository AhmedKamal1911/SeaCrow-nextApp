import { NavbarData } from "@/components/common/header";
import { customFetch } from "../helpers/custom-fetch";

export async function getHeaderData() {
  const data: NavbarData = await customFetch("global", {
    populate: "logoText,navLinks",
  });
  console.log({ data });
  return data;
}
