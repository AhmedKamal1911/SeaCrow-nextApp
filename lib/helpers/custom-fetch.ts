import qs from "qs";
import { flattenAttributes, getCurrentLocale } from "../utils";

type Query = {
  [key: string]: string | boolean | number | Query | null;
};
type CustomFetchArgs = {
  pathname: string;
  query?: Query;
  method?: string;
  body?: Record<string, unknown>;
  token?: string;
};

export async function customFetch({
  pathname,
  query,
  method = "GET",
  body,
  token,
}: CustomFetchArgs) {
  const currentLocale = await getCurrentLocale();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/${pathname}?${qs.stringify(
      query
    )}&locale=${currentLocale}`,
    {
      body: body ? JSON.stringify(body) : undefined,

      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token ? token : undefined}`,
      },
    }
  );
  console.log(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/${pathname}?${qs.stringify(
      query
    )}`
  );
  if (!response.ok && response.status === 404) {
    return undefined;
  }
  const data = await response.json();
  console.log({ d: data });
  return flattenAttributes(data);
}
