import { cn } from "@/lib/utils";
import FetchTripsLoader from "../loaders/fetch-trips-loader";
import { ReactNode } from "react";

export default function Loading({
  className,

  loadingElement = <FetchTripsLoader />,
}: {
  className?: string;
  loadingElement?: ReactNode;
}) {
  // REQUIRED FALLBACK ELEMENT

  return (
    <div className={cn("h-[60vh] flex justify-center items-center", className)}>
      {loadingElement}
    </div>
  );
}
