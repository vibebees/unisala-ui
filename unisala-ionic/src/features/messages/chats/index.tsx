import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  IonCard,
  IonItem,
  IonAvatar,
  IonLabel,
  IonButton,
  IonCardContent,
  IonFooter
} from '@ionic/react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { messageSocket } from '@datasource/servers/endpoints';
import { addSeenEye } from '@datasource/store/action/userActivity';
import { messageSeen } from '../../../utils';

import { TypeBox } from './typeBox';
import { MessageItem } from './messageItem';
import messageImg from '@assets/messages.png';
import './index.css';
import { DefaultChatMessage } from './defaultMessage';
import { useAuth } from '@context/AuthContext';

export const MessagingStation = ({
  friendConversation,
  messagingTo,
  messagingToId,
  previousMessages
}) => {
  console.log({
    friendConversation,
    messagingTo,
    messagingToId,
    previousMessages
  });
  const dispatch = useDispatch();
  const messageSeenBy = [];

  const chatRef = useRef(null);
  const socket = useRef(null);
  const [messages, setMessages] = useState(previousMessages);
  const { user: userInfo } = useAuth();

  useEffect(() => {
    setMessages(previousMessages);
  }, [previousMessages]);

  useEffect(() => {
    socket.current = messageSocket();
    socket.current.emit('joinRoom', {
      senderId: userInfo?.id,
      receiverId: messagingToId
    });
    socket.current.on('getMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // socket.current.on('messageRead', (seenMsg) => {
    //   dispatch(addSeenEye(seenMsg.receiverId));
    // });

    return () => socket.current?.disconnect();
  }, [messagingToId]);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 100); // Delay of 100ms
  }, [messages]);

  const MessageHistory = () => (
    <IonCard className='chats-wrapper'>
      <IonItem lines='full' className='chats-header'>
        <IonAvatar slot='start'>
          <img
            src={
              messagingTo?.profilePicture ||
              'https://www.example.com/default-avatar.png'
            }
            alt={`${messagingTo?.firstName} ${messagingTo?.lastName}`}
          />
        </IonAvatar>
        <IonLabel>
          <h2>{`${messagingTo?.firstName} ${messagingTo?.lastName}`}</h2>
          <p>{messagingTo?.username}</p>
        </IonLabel>
        <Link to={`/@/${userInfo?.username}`}>
          <IonButton>View Profile</IonButton>
        </Link>
      </IonItem>
      <div ref={chatRef} className='chat-box'>
        {messages.map((message, index) => (
          <MessageItem
            item={message}
            key={message._id}
            message={message}
            showEye={messageSeenBy?.includes(messagingToId)}
            currentUserId={userInfo?.id}
            isLastMessage={index === messages.length - 1}
          />
        ))}
      </div>
      <IonFooter style={{ height: '150px' }}>
        <TypeBox socket={socket.current} messagingTo={messagingTo} />
      </IonFooter>
    </IonCard>
  );

  return messagingTo?.username ? (
    <MessageHistory />
  ) : (
    <DefaultChatMessage messageImg={messageImg} />
  );
};
