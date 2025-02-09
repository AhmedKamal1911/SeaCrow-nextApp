// import { CACHE_KEY_MODEL_MAP, StrapiModel } from "@/lib/helpers/cache";
import { CACHE_KEY_MODEL_MAP, StrapiModel } from "@/lib/helpers/cache";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = (await headers()).get("Authorization");
  console.log({ token: token });
  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ message: "invalid api token" }, { status: 401 });
  }
  const reqBody = await req.json();
  const strapiModel = reqBody.model as StrapiModel;
  console.log({ strapiModel, cacheKey: CACHE_KEY_MODEL_MAP[strapiModel] });
  revalidateTag(CACHE_KEY_MODEL_MAP[strapiModel]);
  if (strapiModel === "trip") {
    const changedEntrySlug = reqBody.entry.slug as string;
    const changedEntryLocale = reqBody.entry.locale as string;
    revalidatePath(`/${changedEntryLocale}/trips/${changedEntrySlug}`);
    console.log({
      revalidatePath: `/${changedEntryLocale}/trips/${changedEntrySlug}`,
    });
  }
  return NextResponse.json({
    revalidated: "success",
    message: "Revalidate Success",
  });
}
