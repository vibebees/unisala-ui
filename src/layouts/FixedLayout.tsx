import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Content,
  CardSubtitle,
  Row,
  Col,
} from "../components/defaults";

import "./index.css";
import { cn } from "@utils/index";
import LeftSideBar from "@features/home/leftSideBar";
import { FamousUniversities } from "@components/packages/famousUniversites";

interface LayoutProps {
  leftSidebar?: React.ReactNode;
  children: React.ReactNode;
  rightSidebar?: React.ReactNode;
  leftSideBarSticky?: boolean;
  rightSideBarSticky?: boolean;
}
const leftSidebarDefault = (
  <div>
    <Card>
      <CardHeader>
        <CardSubtitle>Sidebar</CardSubtitle>
        <CardTitle>Left Panel</CardTitle>
      </CardHeader>
      <CardContent>This is some content for the left sidebar.</CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardSubtitle>Sidebar</CardSubtitle>
        <CardTitle>Left Panel</CardTitle>
      </CardHeader>
      <CardContent>This is some content for the left sidebar.</CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardSubtitle>Sidebar</CardSubtitle>
        <CardTitle>Left Panel</CardTitle>
      </CardHeader>
      <CardContent>This is some content for the left sidebar.</CardContent>
    </Card>
    {/* Add more cards if needed */}
  </div>
);

const rightSidebarDefault = (
  <div>
    <Card>
      <CardHeader>
        <CardSubtitle>Sidebar</CardSubtitle>
        <CardTitle>Right Panel</CardTitle>
      </CardHeader>
      <CardContent>This is some content for the right sidebar.</CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardSubtitle>Sidebar</CardSubtitle>
        <CardTitle>Right Panel</CardTitle>
      </CardHeader>
      <CardContent>This is some content for the right sidebar.</CardContent>
    </Card>
    {/* Add more cards if needed */}
  </div>
);
const style = { backgroundColor: "#F0F2F5" };

const FixedLayout: React.FC<LayoutProps> = ({
  leftSidebar = <LeftSideBar />,
  children,
  rightSidebar = <FamousUniversities />,
  leftSideBarSticky = true,
  rightSideBarSticky = true,
}) => {
  return (
    <Content className="layout-content">
      <Row className="layout-row flex flex-nowrap">
        <Col sizeMd="3" className="ion-hide-md-down">
          <div
            className={cn("w-full", leftSideBarSticky && "sticky top-0")}
            style={{ maxWidth: "300px" }}
          >
            {leftSidebar}
          </div>
        </Col>

        <Col sizeSm="12" sizeMd="6">
          {children}
        </Col>

        <Col sizeMd="3" className="ion-hide-md-down">
          <div
           className={cn("w-full", rightSideBarSticky && "sticky top-0")}
           style={{ maxWidth: "300px" }}>
            {rightSidebar}
          </div>
        </Col>
      </Row>
    </Content>
  );
};

export default FixedLayout;
