"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";

interface DatePickerProps {
  name: string;
  defaultDate?: Date | null;
}

export function DatePicker({ name, defaultDate }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | null>(defaultDate || null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal overflow-hidden",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-1 h-4 w-4" />
          <span className="truncate">
            {date ? format(date, "PPP") : "Pick a date"}
          </span>
          <Input
            name={name}
            readOnly
            hidden
            value={date ? date.toString() : ""}
            className="hidden"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={(date) => {
            setDate(date || null);
          }}
          fromDate={new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
