import { Content, Grid, Row, Col, Page } from  '../components/defaults';
import React from 'react';



interface LayoutProps {
  leftSidebar: React.ReactNode;
  mainContent: React.ReactNode;
  rightSidebar: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ leftSidebar, mainContent, rightSidebar }) => {
  return (
    <Page>
      <Content>
        <Row>
          {/* Only visible on medium and larger screens */}
          <Col sizeMd="3" className="ion-hide-sm-down  bg-blue-500">{leftSidebar}</Col>
          
          {/* Always visible, but spans more columns on small screens */}
          <Col sizeSm="12" sizeMd="6" className =" bg-yellow-500">{mainContent}</Col>

          {/* Only visible on medium and larger screens */}
          <Col sizeMd="3" className="ion-hide-sm-down  bg-green-500">{rightSidebar}</Col>
        </Row>
      </Content>
    </Page>
  );
};

export default Layout;
