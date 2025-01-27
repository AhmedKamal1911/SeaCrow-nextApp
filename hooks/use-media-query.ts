import { useEffect } from "react";
import { useState } from "react";

const useMediaQuery = (query: string) => {
  const [isMatched, setIsMatched] = useState(() => matchMedia(query).matches);

  useEffect(() => {
    const handleMediaChange = (e) => {
      setIsMatched(e.matches);
    };
    matchMedia(query).addEventListener("change", handleMediaChange);
    return () => {
      matchMedia(query).removeEventListener("change", handleMediaChange);
    };
  }, []);
  return isMatched;
};

export default useMediaQuery;
