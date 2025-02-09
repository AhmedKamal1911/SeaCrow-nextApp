import NotFoundAnimation from "@/components/common/not-found-animation";
import { getTranslations } from "next-intl/server";

export default async function NotFoundPage() {
  const t = await getTranslations();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <NotFoundAnimation />
      <h2 className="text-center text-4xl   min-[400px]:mt-10 sm:mt-0 sm:text-6xl font-mainFont  font-bold text-clip error-stroke">
        {t("global.errors.notFoundPageError")}
      </h2>
    </div>
  );
}
