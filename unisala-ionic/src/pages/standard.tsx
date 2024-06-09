import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
} from "@ionic/react";
import Layout from "../layouts/FreeLayout";

const HomePage: React.FC = () => {
  // Dummy data for the list
  const items = [
    { title: "Item 1", description: "Description for item 1" },
    { title: "Item 2", description: "Description for item 2" },
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

  const mainContent = (
    <IonList>
      {items.map((item, index) => (
        <IonItem key={index}>
          <IonAvatar slot="start">
            <img
              src={`https://placekitten.com/200/200?image=${index}`}
              alt="avatar"
            />
          </IonAvatar>
          <IonLabel>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
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
  );
};

export default HomePage;
