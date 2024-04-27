// Import React and necessary Ionic components
import React from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { useQuery } from "@apollo/client";
import { PendingConnectionList, ConnectionListType } from "@datasource/graphql/user/";
import UserCard from "@components/packages/userCard";
import StateMessage from "@components/packages/stateMessage";
import emptyState from "@assets/emptyState.png";
import PendingRequestButton from "./PendingRequestButton";
import { USER_SERVICE_GQL } from "@datasource/servers/types";

// TypeScript interfaces for the data
interface User {
  _id: string;
  coverPicture?: string;
  picture?: string;
  firstName: string;
  lastName: string;
  username: string;
  location?: string;
  oneLinerBio?: string;
}

interface ConnectionItem {
  user: User;
}

// The functional component with TypeScript
const Index: React.FC = () => {
  const { data: pendingConnectionList } = useQuery<ConnectionListType>(PendingConnectionList, {
    fetchPolicy: "network-only",
    context: { server: USER_SERVICE_GQL }
  });

  return pendingConnectionList?.pendingConnectionList?.connectionList.length ? (
    <IonGrid>
      <IonRow>
        {pendingConnectionList?.pendingConnectionList?.connectionList.map((item: ConnectionItem, index: number) => (
          <IonCol key={item.user._id}>
            <UserCard
              profileBanner={item.user.coverPicture}
              profileImg={item.user.picture}
              name={`${item.user.firstName} ${item.user.lastName}`}
              username={item.user.username}
              location={item.user.location}
              oneLineBio={item.user.oneLinerBio}
            >
              <PendingRequestButton user={item} />
            </UserCard>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  ) : (
    <StateMessage title="No Pending Requests" subtitle="Start connecting with people">
      <img src={emptyState} alt="empty state" />
    </StateMessage>
  );
};

export default Index;
