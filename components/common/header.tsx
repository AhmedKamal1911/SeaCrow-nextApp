"use client";

import { useEffect, useRef, useState } from "react";
import { Portal } from "@radix-ui/react-portal";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { languages } from "@/lib/data";
import { Menu, X } from "lucide-react";
// import useMediaQuery from "@/hooks/use-media-query";
import clsx from "clsx";

import {
  useRouter,
  usePathname as useI18nPathname,
  Link,
} from "@/i18n/routing";
import { useLocale } from "next-intl";

import { HeaderDataSchemaTypes } from "@/lib/validations/headerDataValidation";

// export type NavbarData = {
//   id: number;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
//   logoText: string;
//   locale: string;
//   navLinks: {
//     id: number;
//     text: string;
//     url: string;
//     isExternal: boolean;
//   }[];
//   meta: Meta;
// };
type Props = {
  data: HeaderDataSchemaTypes;
};

export default function Header({ data }: Props) {
  // const isMatched = useMediaQuery("(max-width: 1280px)");
  // FIXME:Fix aside in media query
  const isMatched = false;
  const pathname = useI18nPathname();

  console.log({ pathname });
  const isHomepage = pathname === "/";
  const ref = useRef(null);
  const [isAnimateHeader, setIsAnimateHeader] = useState(false);

  const logo = data?.logoText;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsAnimateHeader(false);
        } else {
          setIsAnimateHeader(true);
        }
      }, // Adjust threshold as needed
      { rootMargin: "80px 0px" }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <div ref={ref} />
      <header
        className={clsx(
          {
            "animate-fadeDown bg-black": isAnimateHeader,
            "bg-black": !isHomepage,
          },
          "fixed transition-all top-0 start-0 end-0 z-[999] py-4 flex items-center"
        )}
      >
        <div className="container">
          <div className="flex justify-between items-center ">
            <div>
              <Link href="/">
                <h2 className="text-2xl sm:text-3xl text-white font-logoFont uppercase">
                  {logo ?? "SeaCrow"}
                </h2>
              </Link>
            </div>
            <div className="flex gap-16 items-center">
              {isMatched ? (
                <AsideDrawer navLinks={data?.navLinks} />
              ) : (
                <>
                  <NavLinks navLinks={data?.navLinks} />
                  <LanguageSelectMenu />
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function AsideDrawer({
  navLinks,
}: {
  navLinks: HeaderDataSchemaTypes["navLinks"];
}) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [isAnimateDrawerLinks, setIsAnimateDrawerLinks] = useState(false);

  const toggleShowAside = () => {
    setShowDrawer((prev) => !prev);
  };

  useEffect(() => {
    if (!showDrawer) {
      setIsAnimateDrawerLinks(false);
      return;
    }
    const startDrawerLinksAnimation = () => {
      setIsAnimateDrawerLinks(true);
    };
    const timeoutId = setTimeout(startDrawerLinksAnimation, 600);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showDrawer]);
  return (
    <>
      <button onClick={toggleShowAside}>
        <Menu className="text-white size-10" />
      </button>
      <Portal asChild>
        <aside
          className={`${
            showDrawer ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-500 fixed inset-0 z-[1000]  bg-[rgba(27,27,27,0.38)] backdrop-blur-[8px] flex justify-center items-center`}
        >
          <button
            onClick={toggleShowAside}
            className="absolute end-6 top-4 rounded-full w-[40px] h-[40px] z-[999]"
          >
            <X className="text-white size-12" />
          </button>
          <div>
            <div className="overflow-hidden">
              <NavLinks
                navLinks={navLinks}
                disableInitialAnimation
                className={cn(
                  "flex-col transition-transform duration-1000 items-center mb-5",
                  "-translate-y-full",
                  isAnimateDrawerLinks && "translate-y-0"
                )}
              />
            </div>
            <LanguageSelectMenu className="mt-3 mx-auto" />
          </div>
        </aside>
      </Portal>
    </>
  );
}
type NavLinksProps = {
  className?: string;
  disableInitialAnimation?: boolean;
  navLinks: HeaderDataSchemaTypes["navLinks"];
};
function NavLinks({
  className,
  disableInitialAnimation = false,
  navLinks,
}: NavLinksProps) {
  return (
    <nav>
      <ul
        className={cn(
          `flex gap-6 ${disableInitialAnimation ? "" : "animate-smooth-show"} `,
          className
        )}
      >
        {navLinks?.map(({ url, text, id }) => (
          <li className="text-white" key={id}>
            <Link
              href={url}
              className="text-2xl  min-[1200px]:text-xl py-2 block relative after:w-0 hover:after:w-full after:transition-all after:duration-700 after:absolute after:bottom-0 after:start-0 after:h-[3px]  after:bg-gradient-to-r after:from-main after:to-white"
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function LanguageSelectMenu({ className }: { className?: string }) {
  // const { selectedLanguage, onLanguageChange } = useLanguage();
  // const DEFUALT_LANGUAGE = routing.defaultLocale;
  const langLocale = useLocale();
  const router = useRouter();

  const pathname = useI18nPathname();

  function onLanguageChange(langCode: string) {
    router.replace({ pathname }, { locale: langCode });
    console.log({ langCode });
  }
  return (
    <Select value={langLocale} onValueChange={onLanguageChange}>
      <SelectTrigger
        className={cn("text-[17px] text-white w-[120px]", className)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        ref={(ref) => {
          if (!ref) return;
          ref.ontouchstart = (e) => e.preventDefault();
        }}
        className="relative left-[0px] end-0 bg-white z-[1001] w-full"
      >
        {languages.map((language, i) => (
          <SelectItem
            key={i}
            value={language.langCode}
            className={clsx(
              {
                "bg-[#acacad]": language.langCode === langLocale,
              },
              `text-[17px] cursor-pointer hover:!bg-[#c9c8c8] transition-all uppercase w-full  mb-1`
            )}
          >
            {language.langCode === langLocale}
            {language.langCode}
            {
              <Image
                width={18}
                height={18}
                src={`https://flagsapi.com/${language.countryName}/flat/64.png`}
                alt="Country flag"
              />
            }
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
