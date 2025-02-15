// import { CACHE_KEY_MODEL_MAP, StrapiModel } from "@/lib/helpers/cache";
import { Locale, TRIP_SLUG_ALIAS } from "@/i18n/routing";
import { CACHE_KEY_MODEL_MAP, StrapiModel } from "@/lib/helpers/cache";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = (await headers()).get("Authorization");

  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ message: "invalid api token" }, { status: 401 });
  }
  const reqBody = await req.json();
  const strapiModel = reqBody.model as StrapiModel;
  console.log({ strapiModel, cacheKey: CACHE_KEY_MODEL_MAP[strapiModel] });
  const revalidatedTag = CACHE_KEY_MODEL_MAP[strapiModel];
  if (revalidatedTag) {
    revalidateTag(revalidatedTag);
  }
  if (strapiModel === "trip") {
    const changedEntrySlug = reqBody.entry.slug as string;
    const changedEntryLocale = reqBody.entry.locale as Locale;
    const revalidatedPath = `/${changedEntryLocale}/${encodeURIComponent(TRIP_SLUG_ALIAS[changedEntryLocale])}/${changedEntrySlug}`;
    revalidatePath(revalidatedPath);
    console.log({ revalidatedPath });
  }
  return NextResponse.json({
    revalidated: "success",
    message: "Revalidate Success",
  });
}
