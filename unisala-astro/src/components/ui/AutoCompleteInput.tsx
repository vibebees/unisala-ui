 
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

interface AutoCompleteProps extends React.HTMLProps<HTMLInputElement> {
  options: string[];
  value: string;
  setValue: (value: string) => void;
}

export default function AutoComplete({
  options,
  onChange,
  value,
  setValue,

  ...rest
}: AutoCompleteProps) {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleOutsideClick = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClick = (event: any) => {
      if (event.target.closest(".relative") === null) {
        handleOutsideClick();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleInputChange = (event: any) => {
    const inputValue = event.target.value;
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
    setSearchValue(inputValue);
  };
  const handleOptionSelect = (option: any) => {
    setSearchValue(option);
    setValue(option);
    setFilteredOptions(options);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        value={searchValue.trim() ? searchValue : value}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleOptionSelect(searchValue);
          }
          if (e.key === "Escape") {
            setIsOpen(false);
          }
          if (e.key === "ArrowDown") {
            const index = filteredOptions.indexOf(searchValue);
            if (index < filteredOptions.length - 1) {
              setSearchValue(filteredOptions[index + 1]);
            }
          }
          if (e.key === "ArrowUp") {
            const index = filteredOptions.indexOf(searchValue);
            if (index > 0) {
              setSearchValue(filteredOptions[index - 1]);
            }
          }

          if (e.key === "Tab") {
            handleOptionSelect(searchValue);
          }

          if (e.key === "Backspace") {
            setValue("");
          }
        }}
        className="w-full max-md:h-8"
        {...rest}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute text-sm z-10 h-80 overflow-y-auto w-full mt-1 bg-card rounded-md shadow-lg">
          <ul className="flex flex-col gap-1 px-1 py-2">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className={clsx(
                  "hover:bg-neutral-200 capitalize max-md:text-xs cursor-pointer px-3 rounded-sm py-1",
                  {
                    "bg-neutral-300": option === value,
                  }
                )}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
