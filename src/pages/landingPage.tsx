import React from "react";
import { LandingPageTemplate } from "../features/landingpage";
import { Content } from "@components/defaults";

export default function LandingPage() {
  return (
    <Content className="layout-content">
      <div className="w-full ">
        <LandingPageTemplate />
      </div>
    </Content>
  );
}
