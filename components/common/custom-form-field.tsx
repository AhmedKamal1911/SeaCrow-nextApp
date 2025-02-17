import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomInput from "./custom-input";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { HTMLInputTypeAttribute, ReactNode } from "react";
type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | undefined;
  icon?: ReactNode;
};
const CustomFormField = <
  T extends FieldValues = FieldValues,
  K extends FieldPath<T> = FieldPath<T>,
>({
  control,
  name,
  placeholder,
  type,
  icon,
}: Props<T, K>) => {
  // TODO:create lable to improve the seo
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="relative w-full">
            <FormLabel className="sr-only">{placeholder}</FormLabel>
            <FormControl>
              <CustomInput
                type={type}
                placeholder={placeholder}
                {...field}
                icon={icon}
              />
            </FormControl>
            <FormMessage className="text-red-600 text-[16px]" />
          </FormItem>
        );
      }}
    />
  );
};

export default CustomFormField;
