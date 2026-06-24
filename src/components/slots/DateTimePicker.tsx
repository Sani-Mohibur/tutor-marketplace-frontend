"use client";

import React, { useState, useEffect } from "react";
import { format, isBefore, startOfDay } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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

interface DateTimePickerProps {
  value: string;
  onChange: (isoString: string) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined,
  );
  const [time, setTime] = useState<string>(
    value ? format(new Date(value), "HH:mm") : "09:00",
  );

  useEffect(() => {
    if (date) {
      const [hours, minutes] = time.split(":").map(Number);
      const updatedDateTime = new Date(date);
      updatedDateTime.setHours(hours, minutes, 0, 0);
      onChange(updatedDateTime.toISOString());
    }
  }, [date, time]);

  const timeOptions = Array.from({ length: 48 }).map((_, i) => {
    const totalMinutes = i * 30;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    const label = `${displayHours}:${displayMinutes} ${ampm}`;

    return { value: timeString, label };
  });

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="flex-1 space-y-1.5">
        <label className="text-xs font-bold text-muted-foreground uppercase">
          Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal h-10 rounded-xl border-border/80 text-sm pl-3",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(day) => isBefore(day, startOfDay(new Date()))}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full sm:w-[160px] space-y-1.5">
        <label className="text-xs font-bold text-muted-foreground uppercase">
          Start Time
        </label>
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger className="w-full h-10 rounded-xl border-border/80 text-sm font-medium pl-3">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          {/* position="popper" prevents full-screen layout overlays on viewport rendering */}
          <SelectContent
            position="popper"
            className="max-h-48 w-[var(--radix-select-trigger-width)] overflow-y-auto rounded-xl shadow-md bg-popover text-popover-foreground"
          >
            {timeOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-xs cursor-pointer"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
