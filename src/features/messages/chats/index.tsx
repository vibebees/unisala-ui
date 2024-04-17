// eslint-disable-next-line no-use-before-define
import React, { useEffect, useRef, useState } from "react"
import {
    IonCard,
    IonItem,
    IonAvatar,
    IonLabel,
    IonButton,
    IonCardContent,
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList,
    IonIcon
} from "@ionic/react"
import messageImg from "../../../assets/messages.png"
import "./index.css"
import { TypeBox } from "./typeBox"
import { MessageItem } from "./messageItem"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { messageSeen } from "../../../utils"
import { useApolloClient } from "@apollo/client"
import { userInfo } from "../../../utils/cache"
import { messageSocket } from "../../../datasource/servers/endpoints"

export const MessagingStation = ({ data }) => {
    const
        { messagingTo } = useSelector((state) => state?.userActivity),
        { messagingToId } = useParams(),
        user = userInfo,
        chatbox = useRef(null),
        userId = user?.id,
        dispatch = useDispatch(),
        client = useApolloClient(),
        socket = useRef(null),
        { recentMessages } = useSelector((store) => store?.userProfile),
        chatboxRef = useRef(null),
        [ selectedUser, setSelectedUser ] = useState(null),
        [ showMessageView, setShowMessageView ] = useState(false),
        [ messages, setMessages ] = useState([]),
        lastMessageStatus = () => {
            return (<strong>read</strong>)
        },
        { username } = useParams(),
        { messageSeenBy } = useSelector((store) => store?.userActivity),
        showEye = messageSeenBy?.includes(messagingTo?._id),
        MessageHistory = () => {
            return (
                <IonCard className="chats-wrapper">
                    <IonItem mode="ios" lines="full" className="chats-header">
                        <IonAvatar slot="start">
                            <img src="https://www.svgrepo.com/show/178831/badges-money.svg" />
                        </IonAvatar>

                        <IonLabel>
                            <div className="flex justify-content-start">
                                <h2>{messagingTo?.firstName + " " + messagingTo?.lastName}</h2>
                                <img
                                    src="https://www.svgrepo.com/show/178831/badges-money.svg"
                                    alt=""
                                    width={20}
                                />
                            </div>
                            <p>{messagingTo?.username}</p>
                        </IonLabel>
                        <Link to={`/@/${user?.username}`} >
                            <IonButton mode="ios" size="default" >
                                View Profile
                            </IonButton>
                        </Link>

                    </IonItem>
                    <div ref={chatbox} className="chat-box">
                        {messages?.map((item, index) =>
                            <MessageItem showEye={showEye} index={index} key={index} item={item} currentUserId={user?._id} messageSize={messages?.length - 1} />)}
                    </div>
                    <TypeBox socket={socket} dispatch={dispatch} />
                </IonCard>
            )

        },
        DefaultMessage = () => {
            return (
                <IonCard className="chats-wrapper">
                    <IonCardContent className="chats-wrapper__content chats-title">
                        <img src={messageImg} />
                        <h2>Chat with your connections!</h2>
                        <p>Start chatting</p>
                    </IonCardContent>
                </IonCard>
            )
        }
    useEffect(() => {
        if (username && messagingTo && recentMessages && socket && user) {
            messageSeen({ messagingTo, username, recentMessages, socket, user, dispatch });
        }
    }, [ username, messagingTo, recentMessages, socket, user, dispatch ]);


    useEffect(() => {
        const messageSocketConnection = messageSocket();
        socket.current = messageSocketConnection;

        if (userId) {
            socket.current.emit('joinRoom', { senderId: userId, receiverId: messagingToId });
        }

        socket.current.on('getMessage', (messageData) => {
            setMessages(prevMessages => [ ...prevMessages, messageData ]);
            scrollBottom();
        });

        socket.current.on('messageRead', (seenMsg) => {
            dispatch(addSeenEye(seenMsg.receiverId));
        });

        return () => {
            messageSocketConnection.disconnect();
        };
    }, [ userId, messagingToId ]);



    useEffect(() => {
        if (data?.getMessagesById?.[ 0 ]?.messages) {
            setMessages(data.getMessagesById[ 0 ].messages);
            scrollBottom();
        }
    }, [ data ]);


    const scrollBottom = () => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    };

    return username ? <MessageHistory /> : <DefaultMessage />
}
