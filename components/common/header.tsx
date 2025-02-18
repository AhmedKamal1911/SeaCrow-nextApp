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

import clsx from "clsx";

import {
  useRouter,
  usePathname as useI18nPathname,
  Link,
} from "@/i18n/routing";
import { useLocale } from "next-intl";

import { HeaderDataSchemaTypes } from "@/lib/validations/header-schema";
import { useParams } from "next/navigation";

type Props = {
  data: HeaderDataSchemaTypes;
};

export default function Header({ data }: Props) {
  const pathname = useI18nPathname();

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
            <div className="flex items-center gap-2">
              <Image
                src={"/images/logo.jpg"}
                height={50}
                width={50}
                alt="agency logo"
                className="rounded-full select-none"
                draggable={false}
              />
              <Link href="/">
                <h1 className="max-[300px]:text-xl text-2xl sm:text-3xl text-white font-logoFont uppercase">
                  {logo ?? "SeaCrow"}
                </h1>
              </Link>
            </div>
            <nav>
              <AsideDrawer navLinks={data?.navLinks} />

              <nav className="flex gap-16 items-center nav-container">
                <NavLinks navLinks={data?.navLinks} />
                <LanguageSelectMenu />
              </nav>
            </nav>
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
    <div className="aside-drawer">
      <button onClick={toggleShowAside}>
        <Menu className="text-white size-10" />
        <span className="sr-only">Toggle menu</span>
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
            aria-label="Close menu"
          >
            <X className="text-white size-12" />
          </button>
          <div>
            <div className="overflow-hidden">
              <NavLinks
                navLinks={navLinks}
                disableInitialAnimation
                className={cn(
                  "flex-col transition-transform duration-700 items-center mb-5",
                  "-translate-y-full",
                  isAnimateDrawerLinks && "translate-y-0"
                )}
              />
            </div>
            <LanguageSelectMenu className="mt-3 mx-auto" />
          </div>
        </aside>
      </Portal>
    </div>
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
  const langLocale = useLocale();
  const router = useRouter();
  const pathname = useI18nPathname();
  const params = useParams();
  function onLanguageChange(langCode: string) {
    // @ts-expect-error -- TypeScript will validate that only known `params`
    // are used in combination with a given `pathname`. Since the two will
    // always match for the current route, we can skip runtime checks.
    router.replace({ pathname, params }, { locale: langCode });

    // router.replace({ pathname }, { locale: langCode });
  }

  return (
    <Select value={langLocale} onValueChange={onLanguageChange}>
      <SelectTrigger
        aria-label="Select language"
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
