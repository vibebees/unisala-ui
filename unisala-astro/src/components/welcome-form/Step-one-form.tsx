import React, { useState } from "react";
import {
  Book,
  BookOpen,
  Code,
  Star,
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

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("userStatus", event.target.value);
    setSelectedStatus(event.target.value);
  };

  const options = [
    { 
      value: "reader", 
      Icon: Book, 
      label: "Here to Learn 📚",
      description: "Access study materials and explanations"
    },
    {
      value: "share-notes",
      Icon: BookOpen,
      label: "Share Course Notes 📝",
      description: "Want to contribute study materials for future students"
    },
    {
      value: "study-buddy",
      Icon: Users,
      label: "Find Me Study Buddy 🤝",
      description: "Let's tackle deep learning challenges together!"
    },
    {
      value: "research",
      Icon: Star,
      label: "Research  Collab ⭐",
      description: "Interested in collaborating on deep learning research projects"
    },
  
    {
      value: "projects", 
      Icon: Code,
      label: "Find Project Buddy 👥",
      description: "Find partners for assignments and projects"
  },
    // {
    //   value: "feedback",
    //   Icon: MessageSquare,
    //   label: "Early User Feedback 💭",
    //   description: "Happy to provide feedback as an early user"
    // }
   ];

  return (
    <div className="welcome-form-container animate-fadeIn flex flex-col min-h-screen">
      <div className="flex-grow overflow-y-auto p-4 pb-32">
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
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md">
        <div className="max-w-md mx-auto">
          <Button
            label="Next"
            className={`w-full ${
              selectedStatus ? "bg-blue-500 text-white" : "bg-neutral-300"
            } font-medium border border-transparent select-none hover:bg-primary-600 py-2 px-4 rounded`}
            onclick={() => {
              if (!selectedStatus) {
                shakeWebsite();
              }
              selectedStatus ? navigator('/welcome-form/step-two') : null;
            }}
          />

          <Button
            label="Back"
            className="w-full bg-transparent font-medium border-neutral-300 border text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 mt-3 py-2 px-4 rounded"
            onclick={() => {
              navigator("/welcome-form/step-one");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepTwoForm;