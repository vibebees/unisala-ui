 
import React, { useState, type FC } from "react";
import { Input } from "@/components/ui/input";

interface DropdownInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];

  formatOption?: (option: string) => string;
  inputMode?: "text" | "numeric";
  className?: string;
  disabled?: boolean;
}

const DropdownInput: FC<DropdownInputProps> = ({
  placeholder,
  value,
  onChange,
  options,
  formatOption = (option) => option,
  inputMode = "text",
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: any) => {
    if (e.target.value.match(/^[0-9.-]*$/)) {
      onChange(e.target.value);
    }
  };

  const handleOptionClick = (option: any) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative group">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className={`w-full max-md:h-8 ${className}`}
        inputMode={inputMode}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && e.currentTarget.value.includes("-")) {
            onChange("");
          }
        }}
      />
      {isOpen && (
        <section className="text-sm bg-background absolute z-[999] left-0 right-0 top-11 rounded-sm border border-neutral-200">
          <div className="flex flex-col gap-1 px-1 py-2">
            {options.map((option, index) => (
              <p
                key={index}
                onClick={() => handleOptionClick(option)}
                className="hover:bg-neutral-200 max-md:text-xs cursor-pointer px-3 rounded-sm py-1"
              >
                {formatOption(option)}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DropdownInput;
