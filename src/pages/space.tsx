import React from "react";
import Space from "../features/space/index";
import Layout from "../layouts/FixedLayout";
import { FamousUniversities } from "@components/packages/famousUniversites";
import { LeftSideBar } from "@components/packages/spacesAndOrgs";

export default function SpacePage() {
  return <Layout
  leftSidebar={<LeftSideBar />}
  rightSidebar={<FamousUniversities />}
  ><Space /></Layout>;
}
