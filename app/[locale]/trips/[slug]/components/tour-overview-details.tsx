import { RuleType } from "@/lib/types/trips";
import { Check, Info, X } from "lucide-react";

const iconProps = {
  className: "w-5 h-5 relative top-[5px] shrink-0",
};
type Props = {
  status?: "cross" | "info";
  label: string;
  rulesList: RuleType[];
};
export default function TourOverviewDetails({
  status,
  label,
  rulesList,
}: Props) {
  let icon;

  switch (status) {
    case "info":
      icon = <Info {...iconProps} color="orange" />;
      break;
    case "cross":
      icon = <X {...iconProps} color="red" />;
      break;
    default:
      icon = <Check {...iconProps} color="green" />;
      break;
  }

  return (
    <div className="p-2 sm:p-6 flex flex-col sm:flex-row gap-5 sm:gap-0">
      <span className="text-xl sm:text-[21px] flex-1">{label} :</span>
      <ul className="flex-1 flex flex-col gap-5 sm:gap-7">
        {rulesList?.map(({ id, name }) => (
          <li key={id}>
            <span className="text-grayDesc text-[18px] sm:text-[19px] flex items-start gap-2 sm:gap-5 ">
              {icon}
              <span className="leading-7">{name}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
