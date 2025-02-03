import qs from "qs";
import { flattenAttributes } from "../utils";

type Query = {
  [key: string]: string | boolean | number | Query | null;
};

export async function customFetch(
  pathname: string,
  query?: Query,
  method: string = "GET",
  body?: Record<string, unknown>
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/${pathname}?${qs.stringify(
      query
    )}`,
    {
      body: body ? JSON.stringify({ data: body }) : undefined,

      method: method,
      headers: {
        "Content-Type": "application/json",
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
