import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import Button from "./atoms/Button";
import { shakeWebsite } from "@/lib/utils";

interface FieldOfStudyProps {
  // Add any props if needed
}

const FieldOfStudy: React.FC<FieldOfStudyProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [filteredFields, setFilteredFields] = useState<string[]>([]);

  const allFields: string[] = [
    "Computer Science",
    "Computer Information Systems",
    "Computer & Informational Tech.",
    "Computer Applications",
    "Computer Engineering",
    "Computer Graphics",
    "Computer Networks",
    "Computer Programming",
    // Add more fields as needed
  ];

  useEffect(() => {
    setFilteredFields(
      allFields.filter((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const toggleFieldSelection = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  return (
    <div className="welcome-form-container animate-fadeIn">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-slideDown">
        Field of Study
      </h2>
      <p className="text-lg text-gray-600 mb-6 animate-slideDown animation-delay-150">
        Select the field of study you are interested in
      </p>

      <div className="relative mb-6 animate-slideDown animation-delay-300">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 ease-in-out"
          size={20}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search fields..."
          className="w-full pl-10 pr-10 py-3 warning text-neutral-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out hover:rotate-90"
          >
            <X className="text-gray-400 hover:text-gray-600" size={20} />
          </button>
        )}
      </div>

      <div className="max-h-64 overflow-y-auto  animate-fadeIn animation-delay-500">
        {filteredFields.map((field, index) => (
          <label
            key={index}
            className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-all duration-300 ease-in-out animate-slideRight"
            style={{ animationDelay: `${index * 50 + 500}ms` }}
          >
            <input
              type="checkbox"
              checked={selectedFields.includes(field)}
              onChange={() => toggleFieldSelection(field)}
              className="form-checkbox h-5 w-5 text-blue-500  rounded focus:ring-blue-500 transition-all duration-300 ease-in-out"
            />
            <span className="ml-3 text-gray-700">{field}</span>
          </label>
        ))}
      </div>

      <div className="mt-8 flex flex-col ">
        <Button
          url={selectedFields.length ? "step-three" : null}
          lable="Next"
          className={`${
            selectedFields.length ? "bg-blue-500 text-white" : "bg-neutral-300"
          } font-medium border border-transparent select-none hover:bg-primary-600 mt-5`}
          onclick={() => {
            if (!selectedFields.length) {
              shakeWebsite();
            }
          }}
        />
        <Button
          url="step-one"
          lable="Back"
          className="bg-transparent font-medium border-neutral-300 border text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 mt-5"
        />
      </div>
    </div>
  );
};

export default FieldOfStudy;
