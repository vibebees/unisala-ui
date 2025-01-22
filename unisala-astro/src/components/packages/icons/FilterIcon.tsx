import { cn } from '@/utils/lib/utils';
import React from "react";

const FilterIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={cn("h-6 w-6 ", className)}
  >
    <path
      fill="none"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
      d="M32 144h448M112 256h288M208 368h96"
    />
  </svg>
);

export default FilterIcon;
