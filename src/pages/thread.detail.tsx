import React from "react";
import ThreadPage from "../features/thread/index";
import FixedLayout from "@layouts/FixedLayout";
import { FamousUniversities } from "@components/packages/famousUniversites";
import { LeftSideBar } from "@components/packages/spacesAndOrgs";
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
