"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { useEffect, useState } from "react";

interface PriceSliderProps {
  minPrice: number;
  maxPrice: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function PriceSlider({
  minPrice,
  maxPrice,
  value,
  onChange,
}: PriceSliderProps) {
  // Local state to keep slide track movement buttery smooth
  const [localValue, setLocalValue] = useState<[number, number]>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  return (
    <div className="w-full space-y-4 p-1">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Budget Range
        </h3>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground bg-muted/50 px-2 py-1 rounded-lg border border-border/40">
          <span>${value[0]}</span>
          <span className="text-muted-foreground/60">-</span>
          <span>${value[1]}</span>
        </div>
      </div>

      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center h-5"
        value={localValue}
        onValueChange={(val) => setLocalValue(val as [number, number])}
        onValueCommit={(val) => onChange(val as [number, number])}
        min={minPrice}
        max={maxPrice}
        step={5}
        minStepsBetweenThumbs={1}
      >
        {/* Track Line */}
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-secondary/80">
          <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-blue-500 dark:to-cyan-500" />
        </SliderPrimitive.Track>

        {/* Minimum Value Thumb Handle */}
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-emerald-500 dark:border-blue-500 bg-background shadow-xs ring-offset-background transition-transform focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-400 dark:focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 cursor-grab active:cursor-grabbing" />

        {/* Maximum Value Thumb Handle */}
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-teal-500 dark:border-cyan-500 bg-background shadow-xs ring-offset-background transition-transform focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-400 dark:focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 cursor-grab active:cursor-grabbing" />
      </SliderPrimitive.Root>

      <div className="flex justify-between text-[10px] font-medium text-muted-foreground/80 px-0.5">
        <span>Min: ${minPrice}</span>
        <span>Max: ${maxPrice}</span>
      </div>
    </div>
  );
}
