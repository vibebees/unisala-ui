import React, { type FC } from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-neutral-500",
        className
      )}
    />
  );
};

export default Spinner;
