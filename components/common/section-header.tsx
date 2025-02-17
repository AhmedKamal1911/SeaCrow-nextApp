import { cn } from "@/lib/utils";
import Reveal from "./reveal";

type Props = {
  subTitle?: string;
  introText?: string;
  desc?: string;
  className?: string;
  descClassName?: string;
  subTitleClassName?: string;
  subTitleRevealClassName?: string;
  introTextRevealClassName?: string;
};
export default function SectionHeader({
  subTitle,
  introText,
  desc,
  className,
  subTitleClassName,
  descClassName,
  subTitleRevealClassName,
  introTextRevealClassName,
}: Props) {
  return (
    <div className={cn("space-y-6", className)}>
      <Reveal className={subTitleRevealClassName}>
        <span
          className={cn(
            "text-main text-3xl tracking-wide block",
            subTitleClassName
          )}
        >
          {subTitle}
        </span>
      </Reveal>
      <Reveal className={introTextRevealClassName}>
        <span className="text-black text-3xl lg:text-4xl block">
          {introText}
        </span>
      </Reveal>
      {desc && (
        <p className={cn("text-grayDesc text-[18px] leading-8", descClassName)}>
          {desc}
        </p>
      )}
    </div>
  );
}
