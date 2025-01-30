import { cn } from "@/utils/lib/utils";

import React, { type FC } from "react";

interface ButtonProps {
  url?: any;
  label?: string;
  className?: string;
  onclick?: any;
}

const Button: FC<ButtonProps> = ({
  url,
  label = "Next",
  className,
  onclick,
}) => {
  return (
    <a href={url}>
      <button
        onClick={onclick}
        type="button"
        className={cn(
          "w-full py-4 bg-blue-500 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-lg ",
          className
        )}
      >
        {label}
      </button>
    </a>
  );
};

export default Button;
