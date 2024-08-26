import React, { useState } from "react";
import {
  UniversityIcon,
  Search,
  FileArchive,
  GraduationCap,
  Book,
  Compass,
  Share2,
  Star,
  TrendingUp,
  Users,
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
    { value: "learn", Icon: Book, label: "Learn & Explore" },
    { value: "share", Icon: Share2, label: "Share Experiences" },
    { value: "connect", Icon: Users, label: "Connect with Others" },
    { value: "grow", Icon: TrendingUp, label: "Personal Growth" },
    { value: "inspire", Icon: Star, label: "Find Inspiration" },
    { value: "explore", Icon: Compass, label: "Discover Stories" }
  ];

  return (
    <div className="welcome-form-container animate-fadeIn">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
      Pick your purpose:
      </h2>
      <p className="text-lg text-gray-600 mb-8">
       Select your best fit
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
