import { locales } from "@/lib/data";
import TripsPageView from "./components/trips-page-view";
import getTripsPageData from "@/lib/queries/getTripsPageData";
import { Locale } from "@/i18n/routing";
import { getStrapiMediaURL } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const data = await getTripsPageData({ locale });
  const openGraph = data.SEO.openGraph;

  return {
    title: data.SEO.title,
    description: data.SEO.description,
    metadatabase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
    openGraph: {
      title: openGraph.title,
      description: openGraph.description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}${openGraph.url}`,
      siteName: openGraph.siteName,
      images: openGraph.images.data.map((image) => ({
        url: getStrapiMediaURL(image.url),
        height: image.height,
        width: image.width,
        alt: image.name,
      })),
      locale: locale,
    },
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
