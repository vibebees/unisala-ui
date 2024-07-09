import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateSearchParam } from "@/lib/urlParamsUtils";
import { X } from "lucide-react";

interface FilterState {
  gpa: string;
  sat: string;
  act: string;
  amount: string;
  level: string;
}

const initialState: FilterState = {
  gpa: "",
  sat: "",
  act: "",
  amount: "",
  level: "",
};

const Filter: React.FC = () => {
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

  const resetFilters = () => {
    setFilters(initialState);
    window.history.pushState({}, "", window.location.pathname);
  };

  const handleChange = (key: string, value: string) => {
    updateSearchParam(key, value);
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="relative mt-4">
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
        className="grid gap-5 text-neutral-800"
      >
        <div>
          <label
            htmlFor="level"
            className="text-sm font-medium text-neutral-800"
          >
            Level
          </label>
          <Select
            onValueChange={(value) => {
              handleChange("level", value);
            }}
            value={filters.level}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="udergraduate">Undergraduate</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
              <SelectItem value="postgraduate">Postgraduate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label
            htmlFor="level"
            className="text-sm font-medium text-neutral-800"
          >
            Amount
          </label>
          <Select
            onValueChange={(value) => {
              handleChange("amount", value);
            }}
            value={filters.amount}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5000-10000">5000 - 10000</SelectItem>
              <SelectItem value="10000-20000">10000 - 20000</SelectItem>
              <SelectItem value="20000-50000">20000 - 50000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label
            htmlFor="level"
            className="text-sm font-medium text-neutral-800"
          >
            SAT Score
          </label>
          <Select
            onValueChange={(value) => {
              handleChange("sat", value);
            }}
            value={filters.sat}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="SAT Score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1000-12000">1000 - 1200</SelectItem>
              <SelectItem value="1200-1400">1200 - 1400</SelectItem>
              <SelectItem value="1400-1600">1400 - 1600</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label
            htmlFor="level"
            className="text-sm font-medium text-neutral-800"
          >
            ACT Score
          </label>
          <Select
            onValueChange={(value) => {
              handleChange("act", value);
            }}
            value={filters.act}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="ACT Score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1000-1200">1000 - 1200</SelectItem>
              <SelectItem value="1200-1400">1200 - 1400</SelectItem>
              <SelectItem value="1400-1600">1400 - 1600</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label
            htmlFor="level"
            className="text-sm font-medium text-neutral-800"
          >
            GPA Score
          </label>
          <Select
            onValueChange={(value) => {
              handleChange("gpa", value);
            }}
            value={filters.gpa}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="GPA Score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1000-1200">1000 - 1200</SelectItem>
              <SelectItem value="1200-1400">1200 - 1400</SelectItem>
              <SelectItem value="1400-1600">1400 - 1600</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className=" flex items-end">
          <button
            onClick={resetFilters}
            className="text-sm gap-2 py-1 h-10 bg-neutral-100 duration-200 ease-linear active:scale-90 hover:bg-neutral-200 rounded-lg px-3 flex items-center"
          >
            Clear filters <X size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
