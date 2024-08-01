import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { updateSearchParam } from "@/utils/lib/urlParamsUtils";
import { initialState, type FilterState } from "./ScholarShip";
import DropdownInput from "./DropDownInput";

interface FilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const Filter: React.FC<FilterProps> = ({ filters, setFilters }) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newFilters = Object.keys(initialState).reduce((acc, key) => {
      const typedKey = key as keyof FilterState;
      const value = params.get(key) || initialState[typedKey];
      return { ...acc, [typedKey]: value };
    }, {} as FilterState);
    setFilters(newFilters);
  }, []);

  const resetFilters = () => {
    setFilters(initialState);
    window.history.pushState({}, "", window.location.pathname);
  };

  const handleChange = (key: keyof FilterState, value: string) => {
    updateSearchParam(key, value);
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="relative mt-4">
      <div
        // style={{
        //   gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        // }}
        className="grid gap-5 max-md:gap-2 text-neutral-800 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] max-md:grid-cols-[repeat(auto-fill,minmax(150px,0.5fr))]"
      >
        {/* Level Select */}
        <div>
          <label
            htmlFor="level"
            className="text-sm max-md:text-xs font-medium text-neutral-800"
          >
            Level
          </label>
          <Select
            onValueChange={(value) => handleChange("level", value)}
            value={filters.level}
          >
            <SelectTrigger className="w-full max-md:h-8 max-md:text-xs">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Undergraduate">Undergraduate</SelectItem>
              <SelectItem value="Graduate">Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amount Select */}
        {/* <div>
          <label
            htmlFor="amount"
            className="text-sm font-medium text-neutral-800"
          >
            Amount
          </label>
          <DropdownInput
            placeholder="Amount"
            value={filters.amount}
            onChange={(value) => handleChange("amount", value)}
            options={["5000-10000", "10000-20000", "20000-50000"]}
            formatOption={(option) => `$${option}`}
            inputMode="numeric"
          />
        </div> */}

        {/* SAT Score Select */}
        <div>
          <label
            htmlFor="sat"
            className="text-sm max-md:text-xs font-medium text-neutral-800"
          >
            SAT Score
          </label>
          <DropdownInput
            placeholder="SAT Score"
            onChange={(value) => handleChange("sat", value)}
            options={["1000-1200", "1200-1400", "1400-1600"]}
            formatOption={(option) => option}
            inputMode="numeric"
            value={filters.sat}
          />
        </div>

        {/* ACT Score Select */}
        <div>
          <label
            htmlFor="act"
            className="text-sm max-md:text-xs font-medium text-neutral-800"
          >
            ACT Score
          </label>

          <DropdownInput
            placeholder="ACT Score"
            onChange={(value) => handleChange("act", value)}
            options={["20-24", "25-29", "30-36"]}
            formatOption={(option) => option}
            inputMode="numeric"
            value={filters.act}
            className=""
          />
        </div>

        {/* GPA Score Select */}
        <div>
          <label
            htmlFor="gpa"
            className="text-sm max-md:text-xs font-medium text-neutral-800"
          >
            GPA Score
          </label>

          <DropdownInput
            placeholder="GPA Score"
            onChange={(value) => handleChange("gpa", value)}
            options={["2.0-2.5", "2.6-3.0", "3.1-3.5", "3.6-4.0"]}
            formatOption={(option) => option}
            inputMode="numeric"
            value={filters.gpa}
          />
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="text-sm gap-2 py-1 h-10 max-md:h-7 max-md:rounded-md bg-neutral-100 duration-200 ease-linear active:scale-90 hover:bg-neutral-200 rounded-lg px-3 flex items-center"
          >
            Clear filters <X size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
