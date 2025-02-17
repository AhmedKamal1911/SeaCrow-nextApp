// DatePickerWithPresets.jsx

import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { useTranslations } from "next-intl";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

export function DatePicker({
  selectedDate,
  onDateChange,
  placeholder,
}: {
  selectedDate: Date;
  onDateChange: (newDate: Date) => void;
  placeholder?: string;
}) {
  const t = useTranslations();
  const in3Days = "in 3 days";
  const inAWeek = "in a week";
  const in15Days = "in 15 days";
  const handleDateChange = (newDate: Date) => {
    onDateChange(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full text-[16px] ps-0  border-t-0 border-l-0 group border-r-0 border-b-[2px] rounded-none shadow-none focus:border-b-main transition-[border] duration-500 justify-start",
            !selectedDate && "text-gray-800"
          )}
        >
          <CalendarIcon className="me-2 h-4 w-4 text-main" />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span className="group-focus:text-main text-gray-500">
              {placeholder}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2 bg-white">
        <Select
          onValueChange={(value) =>
            handleDateChange(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={t(`global.inputs.date.selectText`)} />
          </SelectTrigger>
          <SelectContent
            ref={(ref) => {
              if (!ref) return;
              ref.ontouchstart = (e) => e.preventDefault();
            }}
            position="popper"
            className="bg-white"
          >
            <SelectItem value="1">
              {t("global.inputs.date.dateInFuture.tomorrow")}
            </SelectItem>
            <SelectItem value="3">
              {t(`global.inputs.date.dateInFuture.${in3Days}`)}
            </SelectItem>
            <SelectItem value="7">
              {t(`global.inputs.date.dateInFuture.${inAWeek}`)}
            </SelectItem>
            <SelectItem value="15">
              {t(`global.inputs.date.dateInFuture.${in15Days}`)}
            </SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(newDate) => newDate && handleDateChange(newDate)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
