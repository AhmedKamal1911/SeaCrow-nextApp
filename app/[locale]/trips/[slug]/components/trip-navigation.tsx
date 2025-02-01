"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function TripNavigation() {
  const [activeSection, setActiveSection] = useState("");
  const t = useTranslations();
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (section) {
      setActiveSection(sectionId);
      const yOffset = -175;
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  return (
    <div className="bg-white rounded-md sticky start-0 end-0 top-[76px] w-full p-3 shadow-lg z-[800]">
      <ul className="flex justify-center flex-col  items-center  min-[500px]:flex-row">
        <li>
          <button
            onClick={() => scrollToSection("info")}
            className={`p-3 font-semibold font-serif hover:text-orange-500 transition-all lg:px-7 lg:py-5 text-[16px] sm:text-xl ${
              activeSection === "info" && "text-orange-500"
            }`}
          >
            {t("tripInfo.navbarInfo.information")}
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("tour-plan")}
            className={` p-3 font-semibold font-serif hover:text-orange-500 transition-all lg:px-7 lg:py-5 text-[16px] sm:text-xl ${
              activeSection === "tour-plan" && "text-orange-500"
            }`}
          >
            {t("tripInfo.navbarInfo.tourPlan")}
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("faq")}
            className={` p-3 font-semibold font-serif hover:text-orange-500 transition-all lg:px-7 lg:py-5 text-[16px] sm:text-xl ${
              activeSection === "faq" && "text-orange-500"
            }`}
          >
            {t("tripInfo.navbarInfo.faq")}
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("reviews")}
            className={` p-3 font-semibold font-serif hover:text-orange-500 transition-all lg:px-7 lg:py-5 text-[16px] sm:text-xl ${
              activeSection === "reviews" && "text-orange-500"
            }`}
          >
            {t("tripInfo.navbarInfo.reviews")}
          </button>
        </li>
      </ul>
    </div>
  );
}
