import { IonCard, IonCardHeader, IonCardContent, IonContent, IonAvatar, IonItem, IonLabel, IonList, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React from "react";
import { Page } from "../components/defaults";
import { LandingPageTemplate } from "../features/landingpage";
import Layout from './layout';





export default function LandingPage() {
  // Dummy data for the list
  const items = [
    { title: 'Item 1', description: 'Description for item 1' },
    { title: 'Item 2', description: 'Description for item 2' },
    // Add more items here
  ];



  const leftSidebar = (
    <div>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Sidebar</IonCardSubtitle>
          <IonCardTitle>Left Panel</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          This is some content for the left sidebar.
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Sidebar</IonCardSubtitle>
          <IonCardTitle>Left Panel</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          This is some content for the left sidebar.
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Sidebar</IonCardSubtitle>
          <IonCardTitle>Left Panel</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          This is some content for the left sidebar.
        </IonCardContent>
      </IonCard>
      {/* Add more cards if needed */}
    </div>
  );


  const rightSidebar = (
    <div>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Sidebar</IonCardSubtitle>
          <IonCardTitle>Right Panel</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          This is some content for the right sidebar.
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Sidebar</IonCardSubtitle>
          <IonCardTitle>Right Panel</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          This is some content for the right sidebar.
        </IonCardContent>
      </IonCard>
      {/* Add more cards if needed */}
    </div>
  );
  return (
    <Layout
    leftSidebar={leftSidebar}
    mainContent={<LandingPageTemplate/>}
    rightSidebar={rightSidebar}
  />
  )  
}