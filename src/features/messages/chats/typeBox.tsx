import React, { useState, useRef, useEffect } from "react"
import { IonButton, IonInput, IonIcon, IonTextarea, IonRow } from "@ionic/react"
import { send } from "ionicons/icons"
import { useSelector } from "react-redux"
import { removeSeenEye } from "../../../datasource/store/action/userActivity"
import { userInfo } from '@utils/cache'


type SocketType = {
  emit: (event: string, data: any) => void;
  on: (event: string, func: (data: any) => void) => void;
  disconnect: () => void;
};

type MessagingToType = {
  firstName: string,
  lastName: string,
  username: string,
  _id: string,
  picture: null
}

type TypeBoxProps = {
    socket: SocketType,
    messagingTo: MessagingToType
};
export const TypeBox = ({ socket, messagingTo }: TypeBoxProps) => {
  const [messageInput, setMessageInput] = useState("");
  const user = userInfo;
  const inputRef = useRef<HTMLIonInputElement>(null); // Make sure to define the ref with the correct element type

  const sendMessage = (e: any) => {
    // Prevent the default form submission if inside a form
    e.preventDefault();

    // Avoid sending empty messages
    if (!messageInput.trim()) {
      return;
    }

    // Construct the message data
    const data = {
      senderId: user?.id,
      receiverId: messagingTo?._id,
      message: {
        text: messageInput.trim()
      },
      seen: false
    };

    // Emit the message creation event
    socket.emit('createMessage', data);

    // Clear the input field after sending the message
    setMessageInput('');
  };

  // Event handler for the key down event
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage(e);
    }
  };

  return (
    <IonRow>
      <IonTextarea
        mode="md"
        className="input-box"
        onIonChange={(e) => setMessageInput(e.detail.value!)} // Make sure you're using the correct property from the event
        placeholder="Message"
        // ref={inputRef}
        value={messageInput}
        onKeyDown={handleKeyDown} // Use the handler function here
      />
      {/* <IonButton type="submit" mode="ios" onClick={sendMessage}>
        <IonIcon icon={send} />
      </IonButton> */}

      <IonButton>
        <IonIcon slot="icon-only" icon={send}></IonIcon>
      </IonButton>

      
    </IonRow>
  );
};
