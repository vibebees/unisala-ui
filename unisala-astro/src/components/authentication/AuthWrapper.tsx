import React, { useState } from "react";
import EmailInput from "./EmailInput";
import NameInput from "./NameInput";
import PinCodeInput from "./PinCodeInput";

const AuthWrapper: React.FC = () => {
  const [authState, setAuthState] = useState<"email" | "name" | "pincode">(
    "pincode"
  );
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

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
        <div className="w-full h-full">
          {authState === "email" && (
            <EmailInput email={email} setEmail={setEmail} />
          )}
          {authState === "name" && (
            <NameInput
              email={email}
              name={name}
              setName={setName}
              onBack={() => setAuthState("email")}
            />
          )}
          {authState === "pincode" && (
            <PinCodeInput email={email} onBack={() => setAuthState("name")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
