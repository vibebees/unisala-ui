import React from "react";
import { ArrowRight } from "lucide-react";

const SubmitButton = () => {
  return (
    <button
      type="submit"
      className="w-full  bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-lg text-lg font-medium hover: transition duration-300 "
    >
      Continue
      <ArrowRight className="size-5 inline-block ml-2" />
    </button>
  );
};

export default SubmitButton;
