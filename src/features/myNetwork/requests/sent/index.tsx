// Import React and necessary Ionic components
import React from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { useQuery } from "@apollo/client";
import { PendingConnectionList, ConnectionListType } from "../../../../datasource/graphql/user/";
import UserCard from "../../../../components/packages/userCard";
import StateMessage from "../../../../components/packages/stateMessage";
import emptyState from "../../../../assets/emptyState.png";
import PendingRequestButton from "./PendingRequestButton";
import { USER_SERVICE_GQL } from "../../../../datasource/servers/types";
let test = [
  {
      "_id": "65c43e0e29ea5e6b9839caf0",
      "status": "pending",
      "date": "2024-02-08T02:35:58.004Z",
      "user": {
          "_id": "653c7c481f8467d8bd28274e",
          "firstName": "Prashant",
          "lastName": "Basnet",
          "username": "prashanbasnet94",
          "oneLinerBio": null,
          "birthday": null,
          "name": null,
          "role": null,
          "verified": null,
          "active": null,
          "picture": null,
          "location": null,
          "coverPicture": null,
          "__typename": "User"
      },
      "__typename": "connectionList"
  },
  {
    "_id": "65c43e0e29ea5e6b9839caf0",
    "status": "pending",
    "date": "2024-02-08T02:35:58.004Z",
    "user": {
        "_id": "653c7c481f8467d8bd28274e",
        "firstName": "Prashant",
        "lastName": "Basnet",
        "username": "prashanbasnet94",
        "oneLinerBio": null,
        "birthday": null,
        "name": null,
        "role": null,
        "verified": null,
        "active": null,
        "picture": null,
        "location": null,
        "coverPicture": null,
        "__typename": "User"
    },
    "__typename": "connectionList"
  },
  {
    "_id": "65c43e0e29ea5e6b9839caf0",
    "status": "pending",
    "date": "2024-02-08T02:35:58.004Z",
    "user": {
        "_id": "653c7c481f8467d8bd28274e",
        "firstName": "Prashant",
        "lastName": "Basnet",
        "username": "prashanbasnet94",
        "oneLinerBio": null,
        "birthday": null,
        "name": null,
        "role": null,
        "verified": null,
        "active": null,
        "picture": null,
        "location": null,
        "coverPicture": null,
        "__typename": "User"
    },
    "__typename": "connectionList"
  },
  {
    "_id": "65c43e0e29ea5e6b9839caf0",
    "status": "pending",
    "date": "2024-02-08T02:35:58.004Z",
    "user": {
        "_id": "653c7c481f8467d8bd28274e",
        "firstName": "Prashant",
        "lastName": "Basnet",
        "username": "prashanbasnet94",
        "oneLinerBio": null,
        "birthday": null,
        "name": null,
        "role": null,
        "verified": null,
        "active": null,
        "picture": null,
        "location": null,
        "coverPicture": null,
        "__typename": "User"
    },
    "__typename": "connectionList"
  },
  {
    "_id": "65c43e0e29ea5e6b9839caf0",
    "status": "pending",
    "date": "2024-02-08T02:35:58.004Z",
    "user": {
        "_id": "653c7c481f8467d8bd28274e",
        "firstName": "Prashant",
        "lastName": "Basnet",
        "username": "prashanbasnet94",
        "oneLinerBio": null,
        "birthday": null,
        "name": null,
        "role": null,
        "verified": null,
        "active": null,
        "picture": null,
        "location": null,
        "coverPicture": null,
        "__typename": "User"
    },
    "__typename": "connectionList"
  },
  {
    "_id": "65c43e0e29ea5e6b9839caf0",
    "status": "pending",
    "date": "2024-02-08T02:35:58.004Z",
    "user": {
        "_id": "653c7c481f8467d8bd28274e",
        "firstName": "Prashant",
        "lastName": "Basnet",
        "username": "prashanbasnet94",
        "oneLinerBio": null,
        "birthday": null,
        "name": null,
        "role": null,
        "verified": null,
        "active": null,
        "picture": null,
        "location": null,
        "coverPicture": null,
        "__typename": "User"
    },
    "__typename": "connectionList"
  },
  {
    "_id": "65c43e0e29ea5e6b9839caf0",
    "status": "pending",
    "date": "2024-02-08T02:35:58.004Z",
    "user": {
        "_id": "653c7c481f8467d8bd28274e",
        "firstName": "Prashant",
        "lastName": "Basnet",
        "username": "prashanbasnet94",
        "oneLinerBio": null,
        "birthday": null,
        "name": null,
        "role": null,
        "verified": null,
        "active": null,
        "picture": null,
        "location": null,
        "coverPicture": null,
        "__typename": "User"
    },
    "__typename": "connectionList"
  },
  {
    "_id": "65c43e0e29ea5e6b9839caf0",
    "status": "pending",
    "date": "2024-02-08T02:35:58.004Z",
    "user": {
        "_id": "653c7c481f8467d8bd28274e",
        "firstName": "Prashant",
        "lastName": "Basnet",
        "username": "prashanbasnet94",
        "oneLinerBio": null,
        "birthday": null,
        "name": null,
        "role": null,
        "verified": null,
        "active": null,
        "picture": null,
        "location": null,
        "coverPicture": null,
        "__typename": "User"
    },
    "__typename": "connectionList"
  },
  {
    "_id": "65c43e0e29ea5e6b9839caf0",
    "status": "pending",
    "date": "2024-02-08T02:35:58.004Z",
    "user": {
        "_id": "653c7c481f8467d8bd28274e",
        "firstName": "Prashant",
        "lastName": "Basnet",
        "username": "prashanbasnet94",
        "oneLinerBio": null,
        "birthday": null,
        "name": null,
        "role": null,
        "verified": null,
        "active": null,
        "picture": null,
        "location": null,
        "coverPicture": null,
        "__typename": "User"
    },
    "__typename": "connectionList"
}
]
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
        {test.map((item: ConnectionItem, index: number) => (
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
