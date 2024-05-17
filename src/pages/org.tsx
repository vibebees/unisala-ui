import React from "react"
import Org from "../features/org/index"
import FixedLayout from "@layouts/FixedLayout"
import { FamousUniversities } from "@components/packages/famousUniversites"
import { LeftSideBar } from "@components/packages/spacesAndOrgs"
export default function OrgPage() {
  return (
    <FixedLayout
    leftSidebar={<LeftSideBar />}
    rightSidebar={<FamousUniversities />}
    >
      <Org/>
      </FixedLayout>
  )
}
