import React from "react";
import { useAuth } from "@/context/AuthContext";
// import { useHistory } from "react-router-dom";
// import { URLupdate } from '@/utils/lib/utils';

interface AuthValidatorProps {
  children: React.ReactNode;
}

const AuthValidator= ({ children }: { children: React.ReactNode }) => {
  const { authenticated } = useAuth();
  const history = () => {};

  if (!authenticated) {
    return (
      <div
        className="cursor-pointer"
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          event.preventDefault();
          event.stopPropagation();
          // const updatedURL = URLupdate("auth", "y");
          // history.push({ search: updatedURL });
        }}
      >
        <div className="pointer-events-none ">{children}</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthValidator;
