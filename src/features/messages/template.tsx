// Messaging System Entry Point
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";

import { ContactList } from "./contactList";
import { MessagingStation } from "./chats";
import {
  MESSAGE_SERVICE_GQL,
  USER_SERVICE_GQL,
} from "@datasource/servers/types";
import { ConnectedList } from "@datasource/graphql/user";
import "./index.css";
import { useAuth } from "@context/AuthContext";
import { fetchMessageHistory } from "@datasource/graphql/msg";
import useDocTitle from "@hooks/useDocTitile";
import { generateConvesationId } from "@utils/lib/messageUtility";
import SingleChat from "./organism/SingleChat";

const MessagingSystem = () => {
  useDocTitle("Messages");

  const { friendUserName } = useParams();
  const history = useHistory();
  const { user } = useAuth();
  const { username, id: userId } = user || {};

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

  // Redirect to the first friend if no specific friend is selected
  useEffect(() => {
    if (!friendUserName && friends.length > 0) {
      const firstFriendUsername = friends[0]?.user?.username;
      history.push(`/messages/${firstFriendUsername}`); // Update the route
    }
  }, [friendUserName, friends, history]);

  const {
    loading: friendMessageLoading,
    error: friendMessageError,
    data: friendsMessages,
  } = useQuery(fetchMessageHistory, {
    variables: {
      userId,
      connectedList: friends.map((friend) => friend?.user?._id),
    },
    context: { server: MESSAGE_SERVICE_GQL },
    skip: !userId || !friends.length,
  });

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);

  const getConversationId = (friendId) => {
    return generateConvesationId([userId, friendId]);
  };
  useEffect(() => {
    const selectedFriend = friends.find(
      (friend) => friend.user.username === friendUserName
    );
    const selectedFriendId = selectedFriend?.user?._id;

    // Find the conversation history for the selected friend
    const conversationForSelectedFriend =
      friendsMessages?.getMessageHistories?.find(
        (convo) => convo?.conversationId === getConversationId(selectedFriendId)
      ) || null;
    if (conversationForSelectedFriend) {
      setConversationId(conversationForSelectedFriend.conversationId);
      setMessages(conversationForSelectedFriend.messages);
    } else {
      // If no conversation exists with this friend, reset to default values
      setConversationId(null);
      setMessages([]);
    }
  }, [friendUserName, friendsData, friendsMessages]);

  const selectedFriendToMessage = friends?.find(
      (o) => o.user.username === friendUserName
    )?.user,
    messagingToId = selectedFriendToMessage?._id,
    messagingTo = selectedFriendToMessage;
  const chatProps = {
    friends,
    friendsLoading,
    friendsError,
    friendConvoLoading: friendMessageLoading,
    friendConvoError: friendMessageError,
    messagingToId,
    messagingTo,
    previousMessages: messages,
  };

  if (friendsLoading || friendMessageLoading) return <div>Loading...</div>;
  return (
    <div className="w-full flex bg-white h-full">
      <section className="w-[300px] h-full bg-neutral-100">
        <ContactList {...chatProps} />
      </section>
      <section className="w-[calc(100%-300px)] ">
        <SingleChat />
      </section>

      {/* <IonCol size="9" className="messages-wrapper">
        {userId && messagingToId && <MessagingStation {...chatProps} />}
      </IonCol> */}
    </div>
  );
};

export default MessagingSystem;
