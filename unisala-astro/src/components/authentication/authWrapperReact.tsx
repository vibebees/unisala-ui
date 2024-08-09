import React, { useLayoutEffect, useState } from "react";
import EmailInput from "./EmailInput";
import NameInput from "./NameInput";
import PinCodeInput from "./PinCodeInput";
import { Toaster } from "react-hot-toast";
import { getCache, setCache } from "@/utils/cache";
import { setUser } from "@/store/userStore";

interface AuthWrapperProps {
  afterState: string;
  children?: React.ReactNode;
}

export const AuthWrapperReact: React.FC<AuthWrapperProps> = ({
  afterState,
  children
}) => {
  const [authState, setAuthState] = useState<"email" | "name" | "pincode">("email");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<{ firstName: string; lastName: string }>({
    firstName: "",
    lastName: "",
  });

  useLayoutEffect(() => {
    const user: any = getCache("authData");
    if (user) {
      setUser(user);
      if (afterState) {
        const decodedRedirect = decodeURIComponent(afterState);
        window.location.href = decodedRedirect;
      }
    }
  }, [afterState]);

  return (
    <div className="w-full flex container">
      <Toaster />
      <div className="w-1/2 max-md:hidden flex items-center justify-start">
        <img
          src="/auth-bg.png"
          alt="Auth illustration"
          className="max-w-full -translate-x-40 dark:mix-blend-normal max-h-full mix-blend-multiply object-cover"
        />
      </div>
      <div className="w-1/2 h-full max-md:w-full flex items-center justify-center">
        <div className="w-full h-full">
          {authState === "email" && (
            <EmailInput
              email={email}
              setEmail={setEmail}
              setAuthState={setAuthState}
            />
          )}
          {authState === "name" && (
            <NameInput
              email={email}
              name={name}
              setName={setName}
              onBack={() => setAuthState("email")}
              setAuthState={setAuthState}
            />
          )}
          {authState === "pincode" && (
            <PinCodeInput email={email} onBack={() => setAuthState("name")} />
          )}
        </div>
      </div>
      {children}
    </div>
  );
};