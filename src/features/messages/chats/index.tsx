import React, { useEffect, useRef, useState } from "react";
import { IonCard, IonItem, IonAvatar, IonLabel, IonButton, IonCardContent } from "@ionic/react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { messageSocket } from "../../../datasource/servers/endpoints";
import { userInfo } from "../../../utils/cache";
import { addSeenEye } from "../../../datasource/store/action/userActivity";
import { messageSeen } from "../../../utils";

import {TypeBox} from "./typeBox";
import {MessageItem} from "./messageItem";
import messageImg from "../../../assets/messages.png";
import "./index.css";

export const MessagingStation = ({ friendConversation, messagingTo, messagingToId }) => {
    const dispatch = useDispatch();
    const { recentMessages, messageSeenBy } = useSelector((store) => store.userProfile);
    const chatRef = useRef(null);
    const socket = useRef(null);
    const [messages, setMessages] = useState([]);

    // Load existing messages from conversation history on component mount
    useEffect(() => {
        if (friendConversation?.length > 0) {
            setMessages(friendConversation[0].messages);
        }
    }, [friendConversation]);

    // Setup socket connection
    useEffect(() => {
        socket.current = messageSocket(); // Establish socket connection
        socket.current.emit('joinRoom', { senderId: userInfo?.id, receiverId: messagingToId });

        socket.current.on('getMessage', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        socket.current.on('messageRead', (seenMsg) => {
            dispatch(addSeenEye(seenMsg.receiverId));
        });

        return () => {
            socket.current.disconnect();
        };
    }, [messagingToId, dispatch]);

    // Scroll to bottom whenever messages update
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);


    console.log({messages})
    const MessageHistory = () => (
        <IonCard className="chats-wrapper">
            <IonItem lines="full" className="chats-header">
                <IonAvatar slot="start">
                    <img src={messagingTo?.profilePicture || "https://www.example.com/default-avatar.png"} alt={`${messagingTo?.firstName} ${messagingTo?.lastName}`} />
                </IonAvatar>
                <IonLabel>
                    <h2>{`${messagingTo?.firstName} ${messagingTo?.lastName}`}</h2>
                    <p>{messagingTo?.username}</p>
                </IonLabel>
                <Link to={`/@/${userInfo?.username}`}>
                    <IonButton>View Profile</IonButton>
                </Link>
            </IonItem>
            <div ref={chatRef} className="chat-box">
                {messages.map((message, index) => (
                    <MessageItem
                        item = {message}
                        key={message._id}
                        message={message}
                        showEye={messageSeenBy?.includes(messagingToId)}
                        currentUserId={userInfo?.id}
                        isLastMessage={index === messages.length - 1}
                    />
                ))}
            </div>
            <TypeBox socket={socket.current} />
        </IonCard>
    );

    const DefaultMessage = () => (
        <IonCard className="chats-wrapper">
            <IonCardContent className="chats-wrapper__content chats-title">
                <img src={messageImg} alt="Start Chatting" />
                <h2>Chat with your connections!</h2>
                <p>Start chatting</p>
            </IonCardContent>
        </IonCard>
    );

    return messagingTo?.username ? <MessageHistory /> : <DefaultMessage />;
};
