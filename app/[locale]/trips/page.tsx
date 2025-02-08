import TripsPageView from "./components/trips-page-view";
// export async function generateStaticParams() {
//   return [{ locale: "en" }, { locale: "ar" }, { locale: "ru" }];
// }
export default async function Trips() {
  return (
    <>
      <TripsPageView />
    </>
  );
}
