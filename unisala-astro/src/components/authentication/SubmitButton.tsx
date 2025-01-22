import React, { type FC } from "react";
import { ArrowRight } from "lucide-react";
import Spinner from "../ui/Spinner";
import clsx from "clsx";

interface SubmitButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({
  disabled = false,
  isLoading = false,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={clsx(
        "w-full inline-flex justify-center items-center  bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-lg text-lg font-medium hover: transition duration-300 ",
        disabled && "bg-blue-200 cursor-not-allowed hover:bg-blue-200"
      )}
    >
      Continue
      {isLoading ? (
        <Spinner className="mx-8 size-5 border-blue-50 border-t-blue-600" />
      ) : (
        <ArrowRight className="size-5 inline-block ml-2 " />
      )}
    </button>
  );
};

export default SubmitButton;
