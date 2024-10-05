"use client"; // Ensure this is at the top of your file

import * as React from "react";
import { format, setYear, startOfMonth } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"; // Ensure correct import
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerProps {
  placeholder?: string;
  onChange?: (date: Date | undefined) => void;
  defaultValue?: Date;
  className?: string;
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ placeholder = "Pick a date", onChange, defaultValue, className }, ref) => {
    const initialDate = defaultValue instanceof Date && !isNaN(defaultValue.getTime()) ? defaultValue : undefined;
    const [date, setDate] = React.useState<Date | undefined>(initialDate);
    const [month, setMonth] = React.useState<Date>(initialDate ? startOfMonth(initialDate) : new Date());

    const handleDateChange = (selectedDate: Date | undefined) => {
      setDate(selectedDate);
      if (selectedDate) {
        setMonth(startOfMonth(selectedDate));
      }
      if (onChange) {
        onChange(selectedDate);
      }
    };

    const handleYearChange = (year: string) => {
      const newYear = parseInt(year);
      if (!isNaN(newYear)) {
        const newMonth = setYear(month, newYear);
        setMonth(newMonth);
        if (date) {
          const newDate = setYear(date, newYear);
          handleDateChange(newDate);
        }
      }
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant={"outline"}
            className={cn(
              "w-full justify-start border-t-0 border-l-0 border-r-0 !border-b rounded-none text-left font-normal",
              !date && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
            <ChevronDown className="ml-auto h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
          <Select
            value={month.getFullYear().toString()}
            onValueChange={handleYearChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: new Date().getFullYear() - 1939 }, (_, i) => (
                <SelectItem key={i} value={(new Date().getFullYear() - i).toString()}>
                  {new Date().getFullYear() - i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="rounded-md border">
            <Calendar 
              mode="single" 
              selected={date} 
              onSelect={(selectedDate) => {
                // Ensure the selected date is a Date object
                if (selectedDate) {
                  const dateObject = new Date(selectedDate);
                  if (!isNaN(dateObject.getTime())) {
                    handleDateChange(dateObject);
                  }
                }
              }} 
              month={month}
              onMonthChange={setMonth}
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = "DatePicker";
