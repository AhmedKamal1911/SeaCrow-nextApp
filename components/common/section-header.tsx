import { cn } from "@/lib/utils";
import Reveal from "./reveal";

type Props = {
  subTitle: string;
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
        <h5
          className={cn("text-main text-3xl tracking-wide", subTitleClassName)}
        >
          {subTitle}
        </h5>
      </Reveal>
      <Reveal className={introTextRevealClassName}>
        <h3 className="text-black text-3xl lg:text-4xl">{introText}</h3>
      </Reveal>
      {desc && (
        <p className={cn("text-grayDesc text-[18px] leading-8", descClassName)}>
          {desc}
        </p>
      )}
    </div>
  );
}
