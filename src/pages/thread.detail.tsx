import React from "react";
import ThreadPage from "../features/thread/index";
import FixedLayout from "@layouts/FixedLayout";
import LeftSideBar from "@features/home/leftSideBar";
import { FamousUniversities } from "@components/packages/famousUniversites";
const ThreadDetail = () => {
  return (
    <FixedLayout
    leftSidebar={<LeftSideBar />}
    rightSidebar={<FamousUniversities />}
    >
      <ThreadPage />
    </FixedLayout>
  );
};

export default ThreadDetail;
