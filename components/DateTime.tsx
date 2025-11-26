"use client";

import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  date?: Date | undefined;
  setDate?: Dispatch<SetStateAction<Date | undefined>> | undefined;
  time?: string;
  setTime?: Dispatch<SetStateAction<string | undefined>> | undefined;
};

export function DateTime(props: Props) {
  const { open, setOpen, date, setDate, time, setTime } = props;
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                if (setDate && date) {
                  setDate(date);
                }
                console.log("date = ", date, "type = ", typeof date);
                if (setOpen) setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Input
          type="time"
          id="time-picker"
          step="1"
          defaultValue={time}
          onChange={(e) => {
            if (setTime) {
              setTime(e.target.value);
            }
            console.log("time = ", e.target.value);
          }}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}
