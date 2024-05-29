import React from "react";
import LayoutSplit from "@layouts/FixedLayout";
import Authentication from "@components/packages/authentication/Authentication";
const AuthPage = () => {
  return (
    <LayoutSplit>
      <Authentication />
    </LayoutSplit>
  );
};
export default AuthPage;
