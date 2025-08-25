import React, { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import axios from "axios";
import type { TopicOptions } from '@/types/post';

interface AsyncAutoCompleteProps extends React.HTMLProps<HTMLInputElement> {
  placeholder?: string;
  apiEndpoint: string;
  topics: TopicOptions[];
  setTopics: (topics: TopicOptions[]) => void;
}

export default function AsyncAutoComplete({
  onChange,
  topics,
  setTopics,
  placeholder,
  apiEndpoint,
  ...rest
}: AsyncAutoCompleteProps) {
  const [filteredOptions, setFilteredOptions] = useState<TopicOptions[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const fetchOptions = useCallback(async (query: string) => {
    if (query.trim().length === 0) {
      setFilteredOptions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`${apiEndpoint}/${query}`);
      const options = response.data.map((item: any) => item);
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
        setSelectedIndex(-1);
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
    setSelectedIndex(-1);
  };

  const handleOptionSelect = (option: TopicOptions) => {
    if (!topics.some((t) => t?.name === option?.name)) {
      setTopics([...topics, option]);
    }
    setSearchValue("");
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleRemoveTopic = (topic: TopicOptions) => {
    setTopics(topics.filter((t) => t.name !== topic.name));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < filteredOptions.length) {
        const selectedOption = filteredOptions[selectedIndex];
        if (selectedOption) {
          handleOptionSelect(selectedOption);
        }
      } else if (searchValue.trim()) {
        const selectedOption: TopicOptions = {
          name: searchValue.trim(),
          entityType: "",
          universityCount: 0,
          unitId: 0,
          _id: ""
        };
        handleOptionSelect(selectedOption);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSelectedIndex(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredOptions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < filteredOptions.length) {
        const selectedOption = filteredOptions[selectedIndex];
        if (selectedOption) {
          handleOptionSelect(selectedOption);
        }
      }
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex flex-wrap gap-2 mb-2">
        {topics.map((topic, index) => (
          <div key={index} className="bg-neutral-200 rounded-full px-3 py-1 text-sm flex items-center">
            {topic?.name}
            <button onClick={() => handleRemoveTopic(topic)} className="ml-2 text-neutral-500 hover:text-neutral-700">
              &times;
            </button>
          </div>
        ))}
      </div>
      <Input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full max-md:h-8"
        placeholder={topics.length === 0 ? placeholder : "Add a topic..."}
        {...rest}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (isLoading || filteredOptions.length > 0) && (
        <div className="absolute text-sm z-10 max-h-80 overflow-y-auto w-full mt-1 bg-card rounded-md shadow-lg">
          <ul role="listbox" aria-label="Topics" className="flex flex-col gap-1 px-1 py-2">
            {isLoading ? (
              <li className="px-3 py-1">Loading...</li>
            ) : (
              filteredOptions.map((option, index) => (
                <li
                  key={option.name}
                  role="option"
                  aria-selected={index === selectedIndex}
                  className={clsx(
                    "hover:bg-neutral-200 capitalize max-md:text-xs cursor-pointer px-3 rounded-sm py-1",
                    {
                      "bg-neutral-300": topics.some(t => t.name === option.name),
                      "bg-neutral-100": index === selectedIndex
                    }
                  )}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option?.name}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}