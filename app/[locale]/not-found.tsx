import NotFoundAnimation from "@/components/common/not-found-animation";

export default function NotFoundPage() {
  console.log("not found");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <NotFoundAnimation />
      <h2 className="text-5xl sm:text-6xl font-mainFont mt-5 font-bold text-clip error-stroke">
        Page Not Found
      </h2>
    </div>
  );
}
