import React from "react";
import Org from "../features/org/index";
import FixedLayout from "@layouts/FixedLayout";
import { LeftSideBar } from "@components/packages/spacesAndOrgs";
import CreateAOrg from "@components/packages/createSpace/CreateSpace";
export default function OrgPage() {
  return (
    <FixedLayout
      leftSidebar={<LeftSideBar order={["Orgs"]} />}
      rightSidebar={
        <>
          <CreateAOrg />
        </>
      }
    >
      <Org />
    </FixedLayout>
  );
}
