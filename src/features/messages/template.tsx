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

  const { messagingToId } = useParams();
  const { username, id: userId } = userInfo || {};


  const { data, loading, error } = useQuery(getMessagesByIdGql, {
    skip: !messagingToId,
    variables: { senderId: userId, receiverId: messagingToId },
    context: { server: MESSAGE_SERVICE_GQL },
    fetchPolicy: 'cache-and-network'
  });

  const { data: friendsData, loading: friendsLoading, error: friendsError } = useQuery(ConnectedList, {
    variables: { userId },
    context: { server: USER_SERVICE_GQL },
    skip: !userId
  });
  const friends = friendsData?.connectedList?.connectionList || [];


  const chatProps = {
    friends,
    friendsLoading,
    friendsError,
    data, loading, error
  };
  return (
    <IonGrid className='messagingGrid'>
    <IonRow  >
      <IonCol>
        <ContactList   {...chatProps} />
      </IonCol>
      <IonCol >
        <MessagingStation  {...chatProps} />
      </IonCol>
    </IonRow>
  </IonGrid>

  );

}

export default MessagingSystem;
