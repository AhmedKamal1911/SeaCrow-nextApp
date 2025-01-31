import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type Props = {
  IconComponent: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  name: string;
  desc: string;
};
export default function OurServiceBox({ IconComponent, desc, name }: Props) {
  return (
    <div className="relative group flex flex-col gap-4 items-center z-10 bg-white p-4 rounded-md text-center after:absolute after:inset-0 after:bg-black after:z-[-1] after:h-0 hover:after:border-b-[15px] after:border-b-main hover:after:h-full after:transition-all after:duration-500 hover:text-white  duration-500 overflow-hidden hover:scale-110 transition-all">
      <IconComponent className=" size-12 sm:size-20 text-main" />
      <h3 className=" text-[17px] md:text-xl font-bold">{name}</h3>
      <p className="text-grayDesc text-[17px] group-hover:text-white transition-colors duration-700">
        {desc}
      </p>
    </div>
  );
}
