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
 
  const mainContent = (
    <IonContent>
     <IonCard>
       <IonCardHeader>Test</IonCardHeader>
       <IonCardContent>
         This is the main content area.
       </IonCardContent>
     </IonCard>
      <IonList>
       {items.map((item, index) => (
         <IonItem key={index}>
           <IonAvatar slot="start">
             <img src={`https://placekitten.com/200/200?image=${index}`} alt="avatar"/>
           </IonAvatar>
           <IonLabel>
             <h2>{item.title}</h2>
             <p>{item.description}</p>
           </IonLabel>
         </IonItem>
       ))}
     </IonList>
    </IonContent>
   );


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
    mainContent={mainContent}
    rightSidebar={rightSidebar}
  />
  )  
}