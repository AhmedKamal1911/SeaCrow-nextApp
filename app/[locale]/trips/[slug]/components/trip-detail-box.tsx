import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  detail: string;
};
export default function TripDetailBox({ detail, icon }: Props) {
  return (
    <div className="flex md:flex-row  items-center gap-2">
      {icon}

      <span className="text-[18px] whitespace-nowrap">{detail}</span>
    </div>
  );
}
