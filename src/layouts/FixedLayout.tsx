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
  leftSidebar = leftSidebarDefault,
  children,
  rightSidebar = rightSidebarDefault,
  leftSideBarSticky = true,
  rightSideBarSticky = true,
}) => {
  return (
    <Content className="layout-content">
      <Row
        className="layout-row px-5 justify-center  mx-auto flex flex-nowrap "
        style={style}
      >
        {/* Only visible on medium and larger screens */}
        <Col sizeMd="3" className="ion-hide-md-down layout-col">
          <div
            className={cn("w-full", leftSideBarSticky && "sticky top-0")}
            style={{ width: "100%", maxWidth: "300px" }}
          >
            {leftSidebar}
          </div>
        </Col>

        {/* Always visible, but spans more columns on small screens */}
        <Col sizeSm="12" sizeMd="6" className="layout-col">
          {children}
        </Col>
        {/* Only visible on medium and larger screens */}
        <Col sizeMd="3" className=" ion-hide-md-down layout-col">
          <div
            className={cn("w-full", rightSideBarSticky && "sticky top-0")}
            style={{ width: "100%", maxWidth: "300px" }}
          >
            {rightSidebar}
          </div>
        </Col>
      </Row>
    </Content>
  );
};

export default FixedLayout;
