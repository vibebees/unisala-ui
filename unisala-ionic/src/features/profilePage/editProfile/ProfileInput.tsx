import { Typography } from "@components/defaults";
import { cn } from "@utils/index";
import React, { ChangeEvent, FC } from "react";

interface ProfileInputProps {
  // eslint-disable-next-line no-unused-vars
  handleOnChage: (e: ChangeEvent<HTMLInputElement>) => void;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder: string;
  name?: string;
  value: string;
  disabled?: boolean;
  className?: string;
  label: string;
}

const ProfileInput: FC<ProfileInputProps> = ({
  handleOnChage,
  placeholder,
  type,
  name,
  value,
  disabled,
  className,
  label,
}) => {
  return (
    <div>
      <Typography variant="h6">{label}</Typography>
      <input
        onChange={handleOnChage}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        autoComplete="off"
        className={cn("auth-input disabled:cursor-not-allowed", className)}
        disabled={disabled}
      />
    </div>
  );
};

export default ProfileInput;
