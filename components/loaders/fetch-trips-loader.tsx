import { loadingAnimationData } from "@/assets/animations";
import Lottie from "lottie-react";

export default function FetchTripsLoader() {
  return (
    <Lottie className="max-w-[500px]" animationData={loadingAnimationData} />
  );
}
