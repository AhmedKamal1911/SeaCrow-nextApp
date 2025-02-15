import { locales } from "@/lib/data";
import TripsPageView from "./components/trips-page-view";
import getTripsPageData from "@/lib/queries/getTripsPageData";
import { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const data = await getTripsPageData({ locale });

  return {
    title: data.SEO.title,
    description: data.SEO.description,
  };
}
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function Trips() {
  return (
    <>
      <TripsPageView />
    </>
  );
}
