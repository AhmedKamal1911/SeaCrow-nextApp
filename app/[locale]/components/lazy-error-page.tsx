"use client";

import NotFoundAnimation from "@/components/common/not-found-animation";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950/95">
      <NotFoundAnimation />
      <h2 className="text-center text-4xl sm:text-5xl font-mainFont mt-5 font-bold text-clip error-stroke">
        {error.message}
      </h2>
    </div>
  );
}
