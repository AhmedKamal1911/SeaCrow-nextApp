"use client";

import useSectionInView from "@/hooks/use-section-view";
import { cn } from "@/lib/utils";
import { animate } from "framer-motion";
import { useEffect, useState } from "react";

type NumberCounterProps = {
  from?: number;
  to?: number;
  numberProps?: string;
};
export default function NumberCounter({
  from = 0,
  to = 1000,
  numberProps,
}: NumberCounterProps) {
  const { ref, inView } = useSectionInView();
  const [currentValue, setCurrentValue] = useState(from);

  useEffect(() => {
    if (inView) {
      const start = Number(from);
      const end = Number(to);

      const controls = animate(start, end, {
        duration: 2,
        ease: "easeInOut",
        onUpdate(value) {
          setCurrentValue(Number(value.toFixed(0))); // Update the state instead of textContent
        },
      });

      return () => {
        controls.stop(); // Cleanup
      };
    }
  }, [from, to, inView]);

  return (
    <span ref={ref} className={cn("text-4xl", numberProps)}>
      {currentValue}
    </span>
  );
}
