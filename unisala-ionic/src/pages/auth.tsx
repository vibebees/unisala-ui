import React from "react";
import LayoutSplit from "@layouts/FixedLayout";
import Authentication from "@components/packages/authentication/Authentication";

const AuthPage = ({ state }: { state: TAuthState }) => {
  return (
    <LayoutSplit>
      <Authentication state={state} />
    </LayoutSplit>
  );
};
export default AuthPage;
