import React from "react"
import Org from "../features/org/index"
import FixedLayout from "@layouts/FixedLayout"
import LeftSideBar from "@features/home/leftSideBar"
import { FamousUniversities } from "@components/packages/famousUniversites"
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
