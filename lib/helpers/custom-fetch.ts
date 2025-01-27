import qs from "qs";
import { flattenAttributes } from "../utils";

type Query = {
  [key: string]: string | boolean | number | Query;
};
export async function customFetch(pathname: string, query: Query) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/${pathname}?${qs.stringify(
      query
    )}`
  );
  console.log(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/${pathname}?${qs.stringify(
      query
    )}`
  );
  if (!response.ok) {
    return undefined;
  }
  const data = await response.json();
  console.log({ d: data });
  return flattenAttributes(data);
}
