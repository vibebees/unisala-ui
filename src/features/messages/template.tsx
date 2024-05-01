// Messaging System Entry Point
import React, { useEffect, useRef } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { useParams } from "react-router-dom";

import { ContactList } from "./contactList";
import { MessagingStation } from "./chats";
import useDocTitle from "../../hooks/useDocTitile";
import {
  USER_SERVICE_GQL,
} from "../../datasource/servers/types";
import { ConnectedList, getFriends } from "@datasource/graphql/user";

import "./index.css";
import { useAuth } from "@context/AuthContext";
import { messageSocket } from "@datasource/servers/endpoints";

const MessagingSystem = () => {
  useDocTitle("Messages");

  const { friendUserName } = useParams();
  const { user } = useAuth(),
  {username, id: userId } = user || {};

  const {
    data: friendsData,
    loading: friendsLoading,
    error: friendsError,
  } = useQuery(ConnectedList, {
    variables: { userId },
    context: { server: USER_SERVICE_GQL },
    skip: !userId,
  });
  const friends = friendsData?.connectedList?.connectionList || [];

  const socket = useRef(null);

  useEffect(() => {
    if (friends?.length > 0) {
      socket.current = messageSocket()
      socket.current.emit("queryRecentMessageForNetwork", {
        userId: user?.id,
        connectedList: friends.map((o) => {
          return {
            senderId: user?.id,
            receiverId: o?.user?._id
          }
        })
      })

      socket.current.on(
        "fetchRecentMessageForNetwork",
        (recentMessagesWithNetwork: any) => {
          const mergedData =
            friends.map((conn) => {
              const userId = conn?.user?._id
              if (!userId) return ""
              const userMessages = recentMessagesWithNetwork.filter(
                (msg) => msg?.senderId === userId || msg?.receiverId === userId
              )
              return { ...conn, recentMessage: userMessages?.[0] }
            }) || []
          console.log("mergedData", mergedData)
          // dispatch(setMyNetworkRecentMessages(mergedData))
        }
      )
    }
  }, [ friends ])


  // find out friend id from friendUserName

  const messagingTo = friends?.find(
      (friend) => friend?.user?.username === friendUserName
    )?.user,
    messagingToId = messagingTo?._id;

  const friendConversation = {};
  const friendConvoLoading = true;
  const friendConvoError = {};


  const chatProps = {
    friends,
    friendsLoading,
    friendsError,
    friendConversation,
    friendConvoLoading,
    friendConvoError,
    messagingToId,
    messagingTo,
  };
  return (
    <IonGrid className="messagingGrid">
      <IonRow>
        <IonCol>
          <ContactList {...chatProps} />
        </IonCol>
        <IonCol className="messages-wrapper">
          <MessagingStation {...chatProps} />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default MessagingSystem;
