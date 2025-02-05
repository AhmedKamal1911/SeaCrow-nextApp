import SectionHeader from "@/components/common/section-header";

import FeaturesList from "../features-list";
import { useTranslations } from "next-intl";
import { IntroSectionDataSchemaType } from "@/lib/validations/introSectionDataValidation";

type Props = {
  data: IntroSectionDataSchemaType;
};
const IntroSection = ({ data }: Props) => {
  const t = useTranslations();

  const featuresList = data.featuresBox;
  const introHeading =
    data?.heading ?? "We are here to help you have the best trip";
  const introDesc =
    data?.desc ??
    "With a large group of diverse, fun and exciting trips in Egypt, we guarantee you a new experience!";

  return (
    <section className="py-[120px] overflow-hidden bg-light relative z-10">
      <div
        style={{
          backgroundImage: `url('/images/map-background.png')`,
        }}
        className={`absolute  inset-0  w-full bg-[50%] bg-no-repeat z-[-1] bg-cover`}
      />
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-center gap-10 md:gap-0">
          <div className="text-center flex-1 md:pe-[100px]">
            <SectionHeader
              className="lg:w-[400px] mx-auto"
              subTitleRevealClassName="mx-auto"
              subTitle={t("homePage.introSection.subTitle")}
              introText={introHeading}
              introTextRevealClassName="max-lg:mx-auto"
              desc={introDesc}
            />
            <div className="mt-16 space-y-10">
              <h3 className="font-signature text-4xl">Seif Haraz</h3>
              <h6 className="text-xl">
                {t("homePage.introSection.managerName")}
              </h6>
              <span className="text-xl text-grayDesc font-bold  font-mono">
                {t("homePage.introSection.managerRank")}
              </span>
            </div>
          </div>
          <FeaturesList className="flex-1" features={featuresList} />
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
