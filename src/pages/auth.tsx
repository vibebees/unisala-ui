import React from "react";
import LayoutSplit from "@layouts/FixedLayout";
import LoginPage from "../features/login";
const AuthPage = () => {
  return (
    <LayoutSplit>
      <LoginPage />
    </LayoutSplit>
  );
};
export default AuthPage;
