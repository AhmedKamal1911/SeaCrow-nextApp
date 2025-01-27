import { cn } from "@/utils/cn";
import ErrorElement from "./ErrorElement";
import FetchTripsLoader from "../loaders/fetch-trips-loader";

const Loading = ({
  children,
  isFetching,
  error,
  loadingElementClassName,
  errorElementClassName,
  errorElement = (
    <ErrorElement
      error={error?.message}
      errorElementClassName={errorElementClassName}
    />
  ),
  loadingElement = <FetchTripsLoader />,
}) => {
  // REQUIRED FALLBACK ELEMENT
  if (isFetching) {
    return (
      <div
        className={cn(
          "h-[60vh] flex justify-center items-center",
          loadingElementClassName
        )}
      >
        {loadingElement}
      </div>
    );
  }
  if (error) {
    return errorElement;
  }
  return children;
};

export default Loading;
