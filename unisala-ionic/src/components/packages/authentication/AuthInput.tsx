/* eslint-disable no-unused-vars */
import React, { FC } from "react";
import "./auth.css";

interface IAuthInput {
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  name: string;
  value: string;
  HandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation: string | undefined | null;
  disabled?: boolean;
}

export const AuthInput: FC<IAuthInput> = ({
  type,
  name,
  value = "",
  HandleChange,
  validation,
  disabled = false,
}) => {
  return (
    <div className="auth-input-val-div">
      <input
        onChange={HandleChange}
        type={type}
        name={name}
        value={value}
        autoComplete="off"
        className="auth-input disabled:cursor-not-allowed"
        disabled={disabled}
      />
      <div className="auth-validation-div">
        {validation && (
          <div className="auth-validation">
            <p> {validation}</p>
            <div className="h-2 w-2 left-3 transform rotate-45 -top-1 absolute bg-red-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AuthInput;
