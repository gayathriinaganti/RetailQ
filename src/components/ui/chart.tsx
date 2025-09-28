import * as React from "react";
import { cn } from "@/lib/utils";

// Simple placeholder chart components to avoid TypeScript errors
// This can be replaced with proper chart implementation later

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full h-full", className)}
    {...props}
  />
));
ChartContainer.displayName = "ChartContainer";

export const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-background p-2 shadow-md",
      className
    )}
    {...props}
  />
));
ChartTooltip.displayName = "ChartTooltip";

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm", className)}
    {...props}
  />
));
ChartTooltipContent.displayName = "ChartTooltipContent";

export const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
));
ChartLegend.displayName = "ChartLegend";

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm", className)}
    {...props}
  />
));
ChartLegendContent.displayName = "ChartLegendContent";

// Chart configuration type
export type ChartConfig = {
  [key: string]: {
    label?: string;
    color?: string;
    theme?: {
      light?: string;
      dark?: string;
    };
  };
};

// Utility function for chart colors
export function getChartColor(key: string, config: ChartConfig) {
  return config[key]?.color || "hsl(var(--primary))";
}

// Export everything for compatibility
export {
  ChartContainer as Chart,
  ChartTooltip as Tooltip,
  ChartTooltipContent as TooltipContent,
  ChartLegend as Legend,
  ChartLegendContent as LegendContent,
};