import React from 'react';
import { Link } from 'react-router-dom';
import { IonButton, IonCard, IonCardContent, IonList, IonListHeader, IonSearchbar } from '@ionic/react';
import './index.css';
import MessageItem from '../messagePop/MessageItem';
import { useDispatch } from 'react-redux';
import { sendMessageTo } from '../../../datasource/store/action/userActivity';

export const ContactList = ({  friends = [] }) => {
    const dispatch = useDispatch();

    const setUpChat = (friend) => {
        dispatch(sendMessageTo(friend.user));
    };

    const handleMessagesList = () => {
        if (friends.length === 0) {
            return <div>No contacts</div>;
        }
        return friends.map((friend, index) => (
            <Link to={`/messages/${friend.user.username}`} key={friend.user._id} onClick={() => setUpChat(friend)}>
                <MessageItem {...friend.user} />
            </Link>
        ));
    };

    return (
        <>
            <IonCard className="chat-list">
                <IonCardContent className="chat-list__container">
                    <div className="flex-column">
                        <IonButton mode="ios">New Messages</IonButton>
                        <IonButton mode="ios" color="light">Screener</IonButton>
                    </div>

                    <IonList className="chat-list__users">
                        <IonListHeader>
                            <h2>Direct Messages</h2>
                        </IonListHeader>
                        <IonSearchbar mode="ios"></IonSearchbar>

                        <div className="chat-list__user-list">
                            {handleMessagesList()}
                        </div>
                    </IonList>
                </IonCardContent>
            </IonCard>
        </>
    );
};
