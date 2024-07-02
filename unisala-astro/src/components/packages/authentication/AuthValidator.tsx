import React, { FC } from "react";
import { useAuth } from "@/context/AuthContext";
import { useHistory } from "react-router";
import { URLupdate } from '@/lib/utils';

interface AuthValidatorProps {
  children: React.ReactNode;
}

const AuthValidator: FC<AuthValidatorProps> = ({ children }) => {
  const { authenticated } = useAuth();
  const history = useHistory();

  if (!authenticated) {
    return (
      <div
        className="cursor-pointer"
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          event.preventDefault();
          event.stopPropagation();
          const updatedURL = URLupdate("auth", "y");
          history.push({ search: updatedURL });
        }}
      >
        <div className="pointer-events-none ">{children}</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthValidator;
