import { Button } from "@/components/ui/button";

export default function TripReviewBox({
  desc,
  buttonLabel,
}: {
  desc: string;
  buttonLabel: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-xl">{desc}</span>
      <Button variant="primary" className="py-4 px-6 sm:py-6 sm:px-8">
        <a href="#">{buttonLabel}</a>
      </Button>
    </div>
  );
}
