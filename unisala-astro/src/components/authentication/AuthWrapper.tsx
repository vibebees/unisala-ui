import React, { useState } from "react";
import EmailInput from "./EmailInput";
import NameInput from "./NameInput";
import PinCodeInput from "./PinCodeInput";

const AuthWrapper: React.FC = () => {
  const [authState, setAuthState] = useState<"email" | "name" | "pincode">(
    "name"
  );
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleEmailSubmit = async (email: string) => {
    setEmail(email);
    // TODO: Add backend check for existing user
    // const userExists = await checkUserExists(email);
    // if (userExists) {
    //   await sendPinCode(email);
    //   setAuthState("pincode");
    // } else {
    //   setAuthState("name");
    // }
  };

  const handleNameSubmit = async (name: string) => {
    setName(name);
    // await sendPinCode(email);
    setAuthState("pincode");
  };

  const handlePinCodeSubmit = async (pinCode: string) => {
    // TODO: Add backend verification of pin code
    // const isValid = await verifyPinCode(email, pinCode);
    // if (isValid) {
    //   // TODO: Implement login logic
    //   console.log("User logged in successfully");
    // } else {
    //   console.error("Invalid pin code");
    // }
  };

  const handleResendPinCode = async () => {
    // await sendPinCode(email);
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log("Google login clicked");
  };

  const renderAuthComponent = (): React.ReactNode => {
    switch (authState) {
      case "email":
        return (
          <EmailInput
            onSubmit={handleEmailSubmit}
            onGoogleLogin={handleGoogleLogin}
          />
        );
      case "name":
        return <NameInput onSubmit={handleNameSubmit} />;
      case "pincode":
        return (
          <PinCodeInput
            onSubmit={handlePinCodeSubmit}
            onResend={handleResendPinCode}
          />
        );
    }
  };

  return (
    <div className="w-full  flex container">
      <div className="w-1/2 max-md:hidden flex items-center justify-start">
        <img
          src="/auth-bg.png"
          alt="Auth illustration"
          className="max-w-full -translate-x-40  dark:mix-blend-normal max-h-full mix-blend-multiply object-cover"
        />
      </div>
      <div className="w-1/2 h-full max-md:w-full flex items-center justify-center ">
        <div className="w-full h-full">{renderAuthComponent()}</div>
      </div>
    </div>
  );
};

export default AuthWrapper;
