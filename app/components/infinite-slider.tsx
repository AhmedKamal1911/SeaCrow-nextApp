import { useLanguage } from "@/contexts/LanguageProvider";
import clsx from "clsx";

import React, { Children, cloneElement, ReactNode } from "react";
type Props = {
  children: ReactNode;
};
export default function InfiniteSlider({ children }: Props) {
  // Clone children to ensure aria-hidden is applied
  const childrenClone = Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return cloneElement(
        child as React.DetailedReactHTMLElement<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        >,
        {
          "aria-hidden": true,
        }
      );
    }
    return child; // Return non-React elements as-is
  });
  const { isRTL } = useLanguage();

  return (
    <div className="overflow-hidden">
      <div
        className={clsx(
          {
            "animate-infiniteSlideRTL": isRTL,
            "animate-infiniteSlideLTR": !isRTL,
          },
          `w-[max-content] py-10 bg-white flex gap-[50px]`
        )}
      >
        {children}
        {childrenClone}
      </div>
    </div>
  );
}
