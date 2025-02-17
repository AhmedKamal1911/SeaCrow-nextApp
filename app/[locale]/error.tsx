"use client";
import dynamic from "next/dynamic";

const LazyErrorPage = dynamic(() => import("./components/lazy-error-page"), {
  ssr: false,
});

export default function ErrorWrapper(props: {
  error: Error & { digest?: string };
}) {
  return <LazyErrorPage {...props} />;
}
