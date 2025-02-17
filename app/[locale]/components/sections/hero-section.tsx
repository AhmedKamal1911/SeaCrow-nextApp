import HeroSlider from "../hero-slider";

import HeroSectionHeading from "../hero-section-heading";
import { HeroSectionDataSchemaType } from "@/lib/validations/hero-section-schema";
import { Link } from "@/i18n/routing";

type Props = {
  data: HeroSectionDataSchemaType;
};
const HeroSection = ({ data }: Props) => {
  // const { selectedLanguage } = useLanguage();

  const heroButton = data.heroButton;
  const heroImagesList = data.heroImages.data;
  const heroHeading = data.heading ?? "Get the trip of your dreams";

  return (
    <section className="h-screen relative">
      <HeroSlider heroImagesList={heroImagesList} />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 px-4 text-center w-full select-none">
        <div className="flex flex-col gap-3 ">
          <HeroSectionHeading>{heroHeading}</HeroSectionHeading>

          <Link
            href={heroButton?.url}
            className="p-3 text-xl bg-[#03030356] w-fit m-auto text-white rounded-sm hover:shadow-lighter transition-all"
          >
            {heroButton?.text ?? "Discover tours"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
