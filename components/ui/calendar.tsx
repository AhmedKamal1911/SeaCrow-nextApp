"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { startOfTomorrow } from "date-fns";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      disabled={[{ before: startOfTomorrow() }]} // Disable all days before tomorrow
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-main font-bold text-[1rem]",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1 ",
        nav_button_next: "absolute right-1 ",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-black w-8 font-bold text-[0.9rem]",
        row: "flex w-full mt-2",
        cell: "h-7 m-[2px] w-7 text-center text-sm p-0 relative",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 p-0 font-normal rounded-none hover:bg-gray-200 "
        ),
        day_selected:
          "bg-main text-white rounded-none hover:bg-main/80 focus:bg-main focus:text-white",
        day_today:
          "!text-white !opacity-100 bg-blue-900 rounded-sm pointer-events-none", // No hover/select effect
        day_outside:
          "text-purple-900 hover:text-purple-900/80 aria-selected:bg-main aria-selected:text-white  dark:text-blue-700 dark:aria-selected:bg-main dark:aria-selected:text-white",
        day_disabled:
          "!text-gray-500 opacity-50 dark:text-gray-400 dark:text-gray-500", // Default disabled style
        day_range_middle:
          "bg-main aria-selected:bg-main dark:bg-main aria-selected:text-main dark:aria-selected:bg-main dark:aria-selected:text-white",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
