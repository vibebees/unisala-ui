import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import {
  IonButton,
  IonIcon,
  IonTextarea,
  IonRow
} from '@ionic/react';
import { send } from 'ionicons/icons';
 import './index.css';
import { useAuth } from '@context/AuthContext';

type MessagingToType = {
  _id: string;
};

type TypeBoxProps = {
  socket: {
    emit: (event: string, data: any) => void;
  };
  messagingTo: MessagingToType;
};

export const TypeBox = memo(({ socket, messagingTo }: TypeBoxProps) => {
  const [messageInput, setMessageInput] = useState('');
  const inputRef = useRef<HTMLIonTextareaElement>(null);
  const {user: userInfo} = useAuth()
  useEffect(() => {
    if (messageInput === '') {
      setTimeout(() => {
        inputRef.current?.setFocus();
      }, 100);
    }
  }, [messageInput]);

  const sendMessage = useCallback(() => {
    const messageText = messageInput.trim();
    if (messageText === '') return;
    const messageData = {
      senderId: userInfo?.id,
      receiverId: messagingTo._id,
      text: messageText,
      seen: false
    };
    console.log('sending message', messageData);

    socket.emit('createMessage', messageData);
    setMessageInput('');
  }, [messageInput, messagingTo._id, socket]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLIonTextareaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  return (
    <IonRow className="type-box">
      <IonTextarea
        mode="md"
        className="input-box"
        style={{ flex: 1 }}
        value={messageInput}
        onIonInput={(e) => setMessageInput(e.detail.value || "")}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        autoGrow={true}
        placeholder='Type a message...'
      />
      <IonButton
        type="button"
        mode="ios"
        onClick={sendMessage}
        style={{ marginLeft: '10px' }}
      >
        <IonIcon icon={send} />
      </IonButton>
    </IonRow>
  );
});

export default TypeBox;
