// Messaging System Entry Point
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useParams } from 'react-router-dom';

import { ContactList } from './contactList';
import { MessagingStation } from './chats';
import useDocTitle from '../../hooks/useDocTitile';
import { MESSAGE_SERVICE_GQL, USER_SERVICE_GQL } from '../../datasource/servers/types';
import { ConnectedList, getFriends, getMessagesByIdGql } from '../../datasource/graphql/user';
import { messageSocket } from '../../datasource/servers/endpoints';
import { setMyNetworkRecentMessages, updateUnreadMessages } from '../../datasource/store/action/userProfile';
import { addSeenEye, removeSeenEye } from '../../datasource/store/action/userActivity';
import { userInfo } from '../../utils/cache';
import './index.css';

const MessagingSystem = () => {
  useDocTitle('Messages');

  const { friendUserName } = useParams();
  const { username, id: userId } = userInfo || {};



  const { data: friendsData, loading: friendsLoading, error: friendsError } = useQuery(ConnectedList, {
    variables: { userId },
    context: { server: USER_SERVICE_GQL },
    skip: !userId
  });
  const friends = friendsData?.connectedList?.connectionList || [];


  // find out friend id from friendUserName

  const 
  messagingTo = friends?.find(friend => friend?.user?.username === friendUserName)?.user,
  messagingToId = messagingTo?._id

  const { data, loading: friendConvoLoading, error: friendConvoError } = useQuery(getMessagesByIdGql, {
    skip: !messagingToId,
    variables: { senderId: userId, receiverId: messagingToId },
    context: { server: MESSAGE_SERVICE_GQL },
    fetchPolicy: 'cache-and-network'
  }),
  friendConversation = data?.getMessagesByIdGql || []
  const chatProps = {
    friends,
    friendsLoading,
    friendsError,
    friendConversation, friendConvoLoading, friendConvoError,
    messagingToId,
    messagingTo,
    userInfo
  };
  return (
    <IonGrid className='messagingGrid'>
    <IonRow  >
      <IonCol>
        <ContactList   {...chatProps} />
      </IonCol>
      <IonCol className="messages-wrapper" > 
        <MessagingStation  {...chatProps} />
      </IonCol>
    </IonRow>
  </IonGrid>

  );

}

export default MessagingSystem;
