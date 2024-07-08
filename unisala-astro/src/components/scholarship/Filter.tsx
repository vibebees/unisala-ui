import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Range {
  min: string;
  max: string;
}

interface FilterState {
  gpa: Range;
  sat: Range;
  act: Range;
  amount: Range;
  level: string;
}

const initialState: FilterState = {
  gpa: { min: "", max: "" },
  sat: { min: "", max: "" },
  act: { min: "", max: "" },
  amount: { min: "", max: "" },
  level: "",
};

const Filter: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(initialState);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newFilters = { ...initialState };
    (Object.keys(newFilters) as Array<keyof FilterState>).forEach((key) => {
      if (typeof newFilters[key] === "object") {
        (newFilters[key] as Range).min = params.get(`${key}Min`) || "";
        (newFilters[key] as Range).max = params.get(`${key}Max`) || "";
      } else {
        newFilters[key] = params.get(key) || "";
      }
    });
    setFilters(newFilters);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: keyof FilterState,
    subKey?: "min" | "max"
  ) => {
    const { value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [key]: subKey ? { ...(prev[key] as Range), [subKey]: value } : value,
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    (Object.entries(filters) as [keyof FilterState, Range | string][]).forEach(
      ([key, value]) => {
        if (typeof value === "object") {
          if (value.min) params.set(`${key}Min`, value.min);
          if (value.max) params.set(`${key}Max`, value.max);
        } else if (value) {
          params.set(key, value);
        }
      }
    );
    window.history.pushState({}, "", `?${params.toString()}`);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters(initialState);
    window.history.pushState({}, "", window.location.pathname);
    setIsFilterOpen(false);
  };

  return (
    <div className="relative mt-8">
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
        className="grid gap-5 "
      >
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Undergraduate</SelectItem>
            <SelectItem value="dark">Graduate</SelectItem>
            <SelectItem value="system">Postgraduate</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Amount" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">5000 - 10000</SelectItem>
            <SelectItem value="dark">10000 - 20000</SelectItem>
            <SelectItem value="system">20000 - 50000</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="SAT Score" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">1000 - 1200</SelectItem>
            <SelectItem value="dark">1200 - 1400</SelectItem>
            <SelectItem value="system">1400 - 1600</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="ACT Score" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">1000 - 1200</SelectItem>
            <SelectItem value="dark">1200 - 1400</SelectItem>
            <SelectItem value="system">1400 - 1600</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="GPA Score" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">1000 - 1200</SelectItem>
            <SelectItem value="dark">1200 - 1400</SelectItem>
            <SelectItem value="system">1400 - 1600</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filter;
