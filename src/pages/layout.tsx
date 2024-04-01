import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import React from 'react';



interface LayoutProps {
  leftSidebar: React.ReactNode;
  mainContent: React.ReactNode;
  rightSidebar: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ leftSidebar, mainContent, rightSidebar }) => {
  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          {/* Only visible on medium and larger screens */}
          <IonCol sizeMd="3" className="ion-hide-sm-down">{leftSidebar}</IonCol>
          
          {/* Always visible, but spans more columns on small screens */}
          <IonCol sizeSm="12" sizeMd="6">{mainContent}</IonCol>

          {/* Only visible on medium and larger screens */}
          <IonCol sizeMd="3" className="ion-hide-sm-down">{rightSidebar}</IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default Layout;
