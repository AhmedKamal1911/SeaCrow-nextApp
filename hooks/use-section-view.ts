import { useInView } from "framer-motion";
import { useRef } from "react";

// Custom hook to get a ref and inView state based on an id
const useSectionInView = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  // useInView hook from framer-motion
  const inView = useInView(ref as React.RefObject<Element>, {
    amount: 0.5,
    once: true,
  });

  return { ref, inView };
};

export default useSectionInView;
