// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from "react"
import { Link, Redirect, useParams } from "react-router-dom"
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonList,
    IonListHeader,
    IonSearchbar

} from "@ionic/react"
import "./index.css"
import MessageItem from "../../../component/messagePop/MessageItem"
import { useDispatch, useSelector } from "react-redux"
import {sendMessageTo} from "store/action/userActivity"

export const Communicators = ({ recentMessages = [], messagingTo = {}, socket = {} }) => {
    const
        [isOpen, setIsOpen] = useState(false),
        { user } = useSelector((store) => store?.userProfile),
        { username } = useParams(),
        //  { loading, error, data } = useQuery(getFriends, { context: { server: MESSAGE_SERVICE_GQL } }),
        dispatch = useDispatch(),
        // { loading, error, data } = useQuery(getFriends, { context: { server: MESSAGE_SERVICE_GQL } }),
        setUpChat = (friend) => {
            dispatch(sendMessageTo((friend?.user)))
        },
        // connectionListWithMessage is merged list of connectionList and it's recent message
        handleMessagesList = () => {
            if (!recentMessages) {
                return <div>No messages</div>
            }
            return recentMessages?.map((item, index) => {
                // const { id, avatar, name, username, message, time } = c
                // console.log("item", item)

                return <Link to={`/messages/${item?.user?.username}`} key={index} onClick={() => setUpChat(item)}>
                    <MessageItem {...item?.user} {...item?.recentMessage} />
                </Link>
            })
        }
    return (
        <>
            <IonCard className="chat-list">
                <IonCardContent className="chat-list__container">
                    <div className="flex-column ">
                        <IonButton mode="ios" onClick={() => setIsOpen(true)}>
                            New Messages
                        </IonButton>
                        <IonButton mode="ios" color="light">
                            Screener
                        </IonButton>
                    </div>

                    <IonList className="chat-list__users">
                        <IonListHeader>
                            <h2>Direct Messages</h2>
                        </IonListHeader>
                        <IonSearchbar mode="ios"></IonSearchbar>

                        <div className="chat-list__user-list">
                            {/* {
                                    loading
                                        ? <SkeletonMessage />
                                        : handleMessagesList(getUsers)
                                } */}
                            {handleMessagesList()}
                        </div>
                    </IonList>
                </IonCardContent>
            </IonCard>
        </>
    )
}
