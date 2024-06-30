/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Lock, RefreshCw, ArrowLeft, Mail } from "lucide-react";
import SubmitButton from "./SubmitButton";

interface PinCodeInputProps {
  onBack: () => void;
  email: string;
}

const PinCodeInput: React.FC<PinCodeInputProps> = ({ onBack, email }) => {
  const [pinCode, setPinCode] = useState("");
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit PIN code", pinCode);
  };

  const onResend = () => {
    console.log("Resend PIN code");
    setCountdown(30);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center mb-6">
        <button
          type="button"
          onClick={onBack}
          className="text-neutral-400 hover:text-neutral-900 transition-colors duration-300 mr-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-neutral-100">
          Enter PIN
        </h2>
      </div>

      <p className="text-gray-600 mb-6 dark:text-neutral-300">
        We've sent a 6-digit PIN to your email. Please enter it below.
      </p>
      <div className="relative mb-6">
        <Lock className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
          className="w-full p-3 pl-12 border border-gray-300 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder:text-neutral-300 rounded-lg"
          placeholder="6-digit PIN"
          maxLength={6}
          pattern="\d{6}"
          accept="number"
          required
        />
      </div>
      <div className="text-sm text-gray-600 dark:text-neutral-300 mb-6">
        <p>Security tips:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Never share your PIN with anyone</li>
          <li>Our team will never ask for your PIN</li>
          <li>Make sure you're on the correct website</li>
        </ul>
      </div>
      <SubmitButton />
      <button
        type="button"
        onClick={onResend}
        disabled={countdown > 0}
        className={`w-full mt-4 bg-gray-200 text-gray-700 p-4 rounded-lg text-lg font-semibold transition duration-300 flex items-center justify-center ${
          countdown > 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
        }`}
      >
        <RefreshCw className="h-5 w-5 mr-2" />
        {countdown > 0 ? `Resend PIN (${countdown}s)` : "Resend PIN"}
      </button>
      <p className="text-xs text-gray-500 text-center mt-4 dark:text-neutral-400">
        Didn't receive the email? Check your spam folder or try resending the
        PIN.
      </p>
    </form>
  );
};

export default PinCodeInput;
