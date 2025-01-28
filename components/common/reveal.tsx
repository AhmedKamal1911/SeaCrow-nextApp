"use client";
import { cn } from "@/lib/utils";
import { motion, useAnimation, useInView } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

type Props = { children: ReactNode; className?: string };
function Reveal({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    amount: 0.7,
  });
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);
  return (
    <div
      ref={ref}
      className={cn("relative w-fit overflow-hidden pb-4", className)}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.8, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute inset-0 bg-main z-20"
      />
    </div>
  );
}

export default Reveal;
