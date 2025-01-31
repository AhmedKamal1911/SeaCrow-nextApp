import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import FaqInput from "./faq-form-fields";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";
type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>;
  name: TName;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | undefined;
};
const FaqFormField = <
  T extends FieldValues = FieldValues,
  K extends FieldPath<T> = FieldPath<T>
>({
  control,
  name,
  placeholder,
  type,
}: Props<T, K>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="w-full">
            <FormControl>
              <FaqInput type={type} placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage className="text-red-600 text-[16px]" />
          </FormItem>
        );
      }}
    />
  );
};

export default FaqFormField;
