import { cn } from "@/lib/utils";

import React, { type FC } from "react";

interface ButtonProps {
  url: any;
  lable?: string;
  className?: string;
  onclick?: any;
}

const Button: FC<ButtonProps> = ({
  url,
  lable = "Next",
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
        {lable}
      </button>
    </a>
  );
};

export default Button;
