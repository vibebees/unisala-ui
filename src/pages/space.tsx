import React from "react";
import Space from "../features/space/index";
import Layout from "../layouts/FixedLayout";
import LeftSideBar from "@features/home/leftSideBar";
import { FamousUniversities } from "@components/packages/famousUniversites";

export default function SpacePage() {
  return <Layout
  leftSidebar={<LeftSideBar />}
  rightSidebar={<FamousUniversities />}
  ><Space /></Layout>;
}
