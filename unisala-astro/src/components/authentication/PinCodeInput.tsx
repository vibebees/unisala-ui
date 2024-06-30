/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Lock, RefreshCw } from "lucide-react";

interface PinCodeInputProps {
  onSubmit: (pinCode: string) => void;
  onResend: () => void;
}

const PinCodeInput: React.FC<PinCodeInputProps> = ({ onSubmit, onResend }) => {
  const [pinCode, setPinCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(pinCode);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 transition-all duration-300 ease-in-out"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Enter PIN</h2>
      <p className="text-gray-600 mb-6">
        We've sent a 6-digit PIN to your email
      </p>
      <div className="relative mb-6">
        <Lock className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
          className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="6-digit PIN"
          maxLength={6}
          pattern="\d{6}"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-purple-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition duration-300 transform hover:-translate-y-1"
      >
        Login
      </button>
      <button
        type="button"
        onClick={onResend}
        className="w-full bg-gray-200 text-gray-700 p-4 rounded-lg text-lg font-semibold hover:bg-gray-300 transition duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
      >
        <RefreshCw className="h-5 w-5 mr-2" />
        Resend PIN
      </button>
    </form>
  );
};

export default PinCodeInput;
