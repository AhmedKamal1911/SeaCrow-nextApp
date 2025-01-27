import { getHeroSectionData } from "@/lib/queries/getHeroSectionData";
import HeroSection from "./components/sections/hero-section";
import { getIntroSectionData } from "@/lib/queries/getIntroSectionData";
import IntroSection from "./components/sections/intro-section";
import AboutUsSection from "./components/sections/about-us-section";
import WhyChooseUsSection from "./components/sections/why-choose-us-section";
import { getWhyChooseUsData } from "@/lib/queries/getWhyChooseUsData";
import TripsSection from "./components/sections/trips-section";
import { getTripsSectionData } from "@/lib/queries/getTripsSectionData";

export default async function Home() {
  const heroSectionData = await getHeroSectionData();
  const introSectionData = await getIntroSectionData();
  const whyChooseUsData = await getWhyChooseUsData();
  const tripsSectionData = await getTripsSectionData("all");

  return (
    <main>
      <HeroSection data={heroSectionData} />
      <IntroSection data={introSectionData} />
      <AboutUsSection />
      {/* <SpecialOffersSection /> */}
      <WhyChooseUsSection data={whyChooseUsData} />
      <TripsSection data={tripsSectionData} />
    </main>
  );
}
