import React from "react";
import LayoutSplit from "@layouts/LayoutSplit";
import LoginPage from "../features/login";
const AuthPage = ({ allProps }) => {
  return (
    <LayoutSplit>
      <LoginPage allProps={{ ...allProps }} />
    </LayoutSplit>
  );
};
export default AuthPage;
