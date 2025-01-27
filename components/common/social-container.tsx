import { TooltipArrow } from "@radix-ui/react-tooltip";
import clsx from "clsx";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
const SOCIALS = [
  { id: "telegram", text: "Telegram", src: "/images/telegram.svg" },
  { id: "whatsApp", text: "WhatsApp", src: "/images/whatsapp.svg" },
  { id: "viber", text: "Viber", src: "/images/viber.svg" },
];
export default function SocialContainer() {
  return (
    <div className="fixed start-2 bottom-5 flex flex-col gap-2 z-[888]">
      {SOCIALS.map(({ id, src, text }) => {
        return (
          <Tooltip key={id} delayDuration={400}>
            <TooltipTrigger>
              <a className="hover:rotate-[20deg] transition-all" href={"#"}>
                <Image src={src} alt="" className="size-12  rounded-full" />
              </a>
            </TooltipTrigger>
            <TooltipContent
              className={clsx(
                {
                  "bg-green-500": id === "whatsApp",
                  "bg-cyan-600": id === "telegram",
                  "bg-purple-600": id === "viber",
                },
                " text-white"
              )}
              sideOffset={10}
              side={"right"}
            >
              <p>{text}</p>
              <TooltipArrow
                className={clsx({
                  "fill-green-500": id === "whatsApp",

                  "fill-cyan-600": id === "telegram",

                  "fill-purple-600": id === "viber",
                })}
              />
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
