import { Input } from "@/components/ui/input";
import { ComponentProps, forwardRef, ReactNode } from "react";

const CustomInput = forwardRef<
  HTMLInputElement,
  ComponentProps<"input"> & { icon?: ReactNode }
>(function CustomInput(props, ref) {
  return (
    <div className="relative">
      <Input
        {...props}
        ref={ref}
        className="text-[16px] focus-visible:ring-transparent ps-7 focus:placeholder:text-main  placeholder:text-gray-500  border-t-0 border-l-0 border-r-0 border-b-[2px] rounded-none shadow-none focus:border-b-main transition-[border,placeholder] duration-500"
      />
      {props.icon && (
        <span className="absolute start-[3px] bottom-3 group-focus:!text-main">
          {props.icon}
        </span>
      )}
    </div>
  );
});

export default CustomInput;
