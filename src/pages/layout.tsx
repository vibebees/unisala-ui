import React from 'react';
import { Card, CardHeader, CardTitle, CardContent,  Content, Item, Label, List, CardSubtitle,  Row, Col, Page } from "../components/defaults";



interface LayoutProps {
  leftSidebar?: React.ReactNode;
  mainContent: React.ReactNode;
  rightSidebar?: React.ReactNode;
}
const leftSidebarDefault = (
  <div>
    <Card>
      <CardHeader>
        <CardSubtitle>Sidebar</CardSubtitle>
        <CardTitle>Left Panel</CardTitle>
      </CardHeader>
      <CardContent>
        This is some content for the left sidebar.
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardSubtitle>Sidebar</CardSubtitle>
        <CardTitle>Left Panel</CardTitle>
      </CardHeader>
      <CardContent>
        This is some content for the left sidebar.
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardSubtitle>Sidebar</CardSubtitle>
        <CardTitle>Left Panel</CardTitle>
      </CardHeader>
      <CardContent>
        This is some content for the left sidebar.
      </CardContent>
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
      <CardContent>
        This is some content for the right sidebar.
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardSubtitle>Sidebar</CardSubtitle>
        <CardTitle>Right Panel</CardTitle>
      </CardHeader>
      <CardContent>
        This is some content for the right sidebar.
      </CardContent>
    </Card>
    {/* Add more cards if needed */}
  </div>
);
const style = {backgroundColor:"#f3f7ff"}
const Layout: React.FC<LayoutProps> = ({ leftSidebar = leftSidebarDefault, mainContent, rightSidebar = rightSidebarDefault }) => {
  return (
    <Page>
      <Content>
        <Row>
          {/* Only visible on medium and larger screens */}
          <Col sizeMd="3" className="ion-hide-md-down" style={style} >{leftSidebar}</Col>

          {/* Always visible, but spans more columns on small screens */}
          <Col sizeSm="12" sizeMd="6"  style ={style}> {mainContent}</Col>

          {/* Only visible on medium and larger screens */}
          <Col sizeMd="3" className="ion-hide-md-down "  style ={style}>{rightSidebar}</Col>
        </Row>
      </Content>
    </Page>
  );
};

export default Layout;
