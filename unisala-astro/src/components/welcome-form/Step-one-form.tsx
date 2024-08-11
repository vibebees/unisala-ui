import React, { useState } from "react";
import {
  UniversityIcon,
  Search,
  FileArchive,
  GraduationCap,
} from "lucide-react";
import Button from "./atoms/Button";
import Option from "./atoms/Option";
import { shakeWebsite } from "@/utils/lib/utils";
import { navigator } from "@/utils/lib/URLupdate";

const StepTwoForm = () => {
  const [selectedStatus, setSelectedStatus] = useState(
    localStorage.getItem("userStatus") || ""
  );

  const handleStatusChange = (event: any) => {
    localStorage.setItem("userStatus", event.target.value);
    setSelectedStatus(event.target.value);
  };

  const options = [
    { value: "researching", Icon: Search, label: "Researching options" },
    { value: "applying", Icon: FileArchive, label: "Applying to programs" },
    { value: "enrolled", Icon: UniversityIcon, label: "Currently enrolled" },
    { value: "graduated", Icon: GraduationCap, label: "Graduated" },
  ];

  return (
    <div className="welcome-form-container animate-fadeIn">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        What's your current status for studying in the USA?
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Please select the option that best describes your situation:
      </p>

      <div className="space-y-4 mb-8">
        {options.map((option) => (
          <Option
            key={option.value}
            {...option}
            handleStatusChange={handleStatusChange}
            option={option}
            selectedStatus={selectedStatus}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col ">
        <Button
           lable="Next"
          className={`${
            selectedStatus ? "bg-blue-500 text-white" : "bg-neutral-300"
          } font-medium border border-transparent select-none hover:bg-primary-600 mt-5`}
          onclick={() => {
            if (!selectedStatus) {
              shakeWebsite();
            }
            selectedStatus ? navigator('/welcome-form/step-two') : null
          }}
        />

        <Button
          lable="Back"
          className="bg-transparent font-medium border-neutral-300 border text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 mt-5"
          onclick={() => {
            navigator("/welcome-form/step-one");
          }}
        />
      </div>
    </div>
  );
};

export default StepTwoForm;
