/* eslint-disable no-unused-vars */
import React, { type FC } from "react";

interface OptionProps {
  option: {
    value: string;
    label: string;
    Icon: any;
  };
  selectedStatus: string;
  handleStatusChange: (e: any) => void;
}

const Option: FC<OptionProps> = ({
  handleStatusChange,
  option,
  selectedStatus,
}) => {
  return (
    <label
      key={option.value}
      className={`flex items-center p-4 warning bg-gray-100 border-2  rounded-lg cursor-pointer ease-linear transition-all duration-300 hover:bg-gray-200  ${
        selectedStatus === option.value
          ? "border-blue-500"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <input
        type="radio"
        name="status"
        value={option.value}
        checked={selectedStatus === option.value}
        onChange={handleStatusChange}
        className="hidden"
      />
      <span
        className={`flex items-center duration-200 ease-linear transition-all text-lg ${
          selectedStatus === option.value
            ? "text-blue-500 font-semibold"
            : "text-gray-700"
        }`}
      >
        <option.Icon className="mr-3 text-xl" />
        {option.label}
      </span>
    </label>
  );
};

export default Option;
