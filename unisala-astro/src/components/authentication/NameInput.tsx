/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { User } from "lucide-react";
import SubmitButton from "./SubmitButton";

interface NameInputProps {
  onSubmit: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 transition-all duration-300 ease-in-out"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Nice to meet you
      </h2>
      <p className="text-gray-600 mb-6">Please enter your full name</p>
      <div className="relative mb-6">
        <User className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Full Name"
          required
        />
      </div>
      <SubmitButton />
    </form>
  );
};

export default NameInput;
