import React, { useState } from "react";
import { GraduationCap, BookOpen, FlaskConical, Atom } from "lucide-react";

import Button from "./atoms/Button";
import Option from "./atoms/Option";
import { shakeWebsite } from "@/lib/utils";

const StepThreeForm = () => {
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };

  const options = [
    { value: "bachelor", Icon: BookOpen, label: "Bachelor" },
    { value: "masters", Icon: FlaskConical, label: "Masters" },
    { value: "phd", Icon: Atom, label: "PHD" },
  ];

  return (
    <div className="welcome-form-container animate-fadeIn">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-slideDown flex items-center">
        <GraduationCap className="mr-2" size={32} />
        What degree are you pursuing?
      </h2>
      <p className="text-lg text-gray-600 mb-6 animate-slideDown animation-delay-150">
        Please select your intended level of study
      </p>

      <div className="grid grid-cols-1 gap-4 mb-8 animate-fadeIn animation-delay-300">
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
          url={selectedStatus ? "step-three" : null}
          lable="Next"
          className={`${
            selectedStatus ? "bg-blue-500 text-white" : "bg-neutral-300"
          } font-medium border border-transparent select-none hover:bg-primary-600 mt-5`}
          onclick={() => {
            if (!selectedStatus) {
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

export default StepThreeForm;
