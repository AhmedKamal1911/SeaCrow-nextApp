"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { FooterDataSchemaTypes } from "@/lib/validations/footer-schema";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import useIsRTL from "@/hooks/use-is-rtl";

type Props = {
  data: FooterDataSchemaTypes;
};

export default function Footer({ data }: Props) {
  const t = useTranslations();

  const linksList = data.navLinks;
  const contactLinks = data.contactLinks;
  return (
    <footer className="bg-[#050a16] relative min-h-[50vh] overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          <div
            className="absolute w-[494px] h-[465px] start-[-100px] top-0 bottom-0 "
            style={{ backgroundImage: `url("/images/Uneven-waves.png")` }}
          />
          <div
            className="absolute w-[247px] h-[477px] end-[0px] top-0 bottom-0"
            style={{ backgroundImage: `url("/images/dashed-lines.png")` }}
          />
          <div>
            <FooterSectionHeader
              title={t("footer.aboutUsSection.title")}
              desc={t("footer.aboutUsSection.desc")}
            />
            <Button asChild variant="primary" className="py-6 px-7">
              <Link href="/about-us">
                {t("footer.aboutUsSection.aboutUsButtonLabel")}
              </Link>
            </Button>
          </div>
          <div>
            <FooterSectionHeader title={t("footer.contactUsSectionTitle")} />
            <DynamicInfoSection infoList={contactLinks} />
          </div>
          <div>
            <FooterSectionHeader title={t("footer.quickLinksSectionTitle")} />
            <DynamicInfoSection infoList={linksList} />
          </div>
          <div>
            <FooterSectionHeader
              title={t("footer.reachUsSection.title")}
              desc={t("footer.reachUsSection.desc")}
            />
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.facebook.com"
                target="_blank"
                className=" bg-white"
              >
                <Image
                  width={35}
                  height={35}
                  src={"/images/facebook.svg"}
                  alt="facebook"
                />
              </a>
              <a href="tel:01450151145">
                <Image
                  width={35}
                  height={35}
                  src={"/images/whatsapp.svg"}
                  alt="whatsapp"
                />
              </a>

              <a href="tel:01450151145">
                <Image
                  width={35}
                  height={35}
                  src={"/images/instagram.png"}
                  alt="instgram"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="relative text-center  flex flex-col sm:flex-row justify-between p-5 bg-[#363d5371]  gap-10 rounded-md">
          <p className="text-main text-xl ">
            &copy; {t("footer.copyRightReference")}
          </p>
          <span className="text-white text-xl">
            {t("footer.poweredBy")}

            <a
              href="mailto:khmedamal@gmail.com"
              target="_blank"
              className="text-main text-lg !font-logoFont"
            >
              UltraTeam
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterSectionHeader({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) {
  return (
    <div className="relative">
      <span className="relative text-main text-xl mb-10 block">
        {title}
        <div
          className="absolute w-[30px] h-[9px]"
          style={{ backgroundImage: `url('/images/wave-lines.png')` }}
        />
      </span>
      {desc && <p className="text-white lg:w-[270px]">{desc}</p>}
    </div>
  );
}

function DynamicInfoSection({
  infoList,
}: {
  infoList:
    | FooterDataSchemaTypes["navLinks"]
    | FooterDataSchemaTypes["contactLinks"];
}) {
  const isRTL = useIsRTL();
  return (
    <div>
      <ul className="flex flex-col gap-3 z-40 relative">
        {infoList.map((info) => (
          <li className="flex items-center gap-2" key={info.id}>
            {isRTL ? (
              <ChevronsLeft className="text-main" />
            ) : (
              <ChevronsRight className="text-main" />
            )}
            {isContactInfo(info) ? (
              <a
                href={`${
                  info.type === "tel"
                    ? "tel:"
                    : info.type === "mail"
                      ? "mailto:"
                      : ""
                }${info.url}`}
                target={
                  info.type === "mail" || info.type === "tel"
                    ? "_self"
                    : "_blank"
                }
                className="text-[#d3d3d3] text-[18px] hover:text-white transition-all duration-300 relative after:absolute after:bg-main after:rounded-lg after:start-0 after:bottom-0 after:h-[2px] after:w-0 after:transition-all after:duration-500 hover:after:w-full"
              >
                {info.text}
              </a>
            ) : (
              <Link
                href={info.url}
                className="text-[#d3d3d3] text-[18px] hover:text-white transition-all duration-300 relative after:absolute after:bg-main after:rounded-lg after:start-0 after:bottom-0 after:h-[2px] after:w-0 after:transition-all after:duration-500 hover:after:w-full"
              >
                {info.text}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function isContactInfo(
  info:
    | FooterDataSchemaTypes["navLinks"][0]
    | FooterDataSchemaTypes["contactLinks"][0]
): info is FooterDataSchemaTypes["contactLinks"][0] {
  return "type" in info && !("isExternal" in info);
}
