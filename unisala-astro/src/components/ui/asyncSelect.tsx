@ -0,0 +1,140 @@
import React, { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import axios from "axios";

interface AutoCompleteProps extends React.HTMLProps<HTMLInputElement> {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  apiEndpoint: string;
}

export default function AsyncAutoComplete({
  onChange,
  value,
  setValue,
  placeholder,
  apiEndpoint,
  ...rest
}: AutoCompleteProps) {
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchOptions = useCallback(async (query: string) => {
    if (query.trim().length === 0) {
      setFilteredOptions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`${apiEndpoint}/${query}/5`);
      const options = response.data.map((item: any) => item.name);
      setFilteredOptions(options);
    } catch (error) {
      console.error("Error fetching options:", error);
      setFilteredOptions([]);
    } finally {
      setIsLoading(false);
    }
  }, [apiEndpoint]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchOptions(searchValue);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchValue, fetchOptions]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(".relative") === null) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
    setIsOpen(true);
  };

  const handleOptionSelect = (option: string) => {
    setSearchValue(option);
    setValue(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        value={searchValue || value}
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
          if (e.key === "Backspace" && searchValue === "") {
            setValue("");
          }
        }}
        className="w-full max-md:h-8"
        placeholder={placeholder}
        {...rest}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (isLoading || filteredOptions.length > 0) && (
        <div className="absolute text-sm z-10 max-h-80 overflow-y-auto w-full mt-1 bg-card rounded-md shadow-lg">
          <ul className="flex flex-col gap-1 px-1 py-2">
            {isLoading ? (
              <li className="px-3 py-1">Loading...</li>
            ) : (
              filteredOptions.map((option, index) => (
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
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}