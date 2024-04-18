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
  Page,
} from "../components/defaults";

import "./index.css";
import { IonPage, IonCard } from "@ionic/react";
import { Test } from "vitest";

interface LayoutProps {
  leftSidebar?: React.ReactNode;
  children: React.ReactNode;
  rightSidebar?: React.ReactNode;
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
let mainContentStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "0 10px",
  },
  mainRowStyle = { maxWidth: "1128px", width: "100%", flexWrap: "nowrap" };

const Layout: React.FC<LayoutProps> = ({
  leftSidebar = leftSidebarDefault,
  children,
  rightSidebar = rightSidebarDefault,
}) => {
  return (
    <Page style={{ backgroundColor: "#F0F2F5" }}>
      <Content className="layout-content ">
        <Row className="layout-row" style={style}>
          {/* Only visible on medium and larger screens */}
          <Col sizeMd="3" className="ion-hide-md-down layout-col">
            <div
              id="left-sidebar"
              style={{ width: "100%", maxWidth: "300px" }}
            ></div>
          </Col>

          {/* Always visible, but spans more columns on small screens */}
          <Col sizeSm="12" sizeMd="6" className="layout-col">
            <div style={{ width: "100%", maxWidth: "900px" }}>{children}</div>
          </Col>
          {/* Only visible on medium and larger screens */}
          <Col sizeMd="3" className=" ion-hide-md-down layout-col">
            <div style={{ width: "100%", maxWidth: "300px" }}>
              {rightSidebar}
            </div>
          </Col>
        </Row>
      </Content>
    </Page>
  );
};

export default Layout;
