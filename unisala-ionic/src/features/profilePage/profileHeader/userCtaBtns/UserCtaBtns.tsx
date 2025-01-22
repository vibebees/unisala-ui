import React, { useEffect } from "react";
import { useState } from "react";
import { chatbubbles, personAdd } from "ionicons/icons";
import { IonButton, IonIcon, useIonToast } from "@ionic/react";
import { useMutation } from "@apollo/client";
import {
  SendConnectRequest,
  AcceptConnectRequest,
  getUserGql,
} from "@datasource/graphql/user";
import EditProfile from "../editProfile";
import "./UserCtaBtns.css";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { useAuth } from "@context/AuthContext";
import { useHistory, useParams } from "react-router";
import { color } from 'framer-motion';
import { useAcceptConnectRequest, useSendConnectRequest } from './action';


/*

  1. Profile data loads
      a. it has connectionType
          {
              "requestorId": "6518f0255e80b0cd4efb1ef9",
              "receiverId": "64b96b2720785e9049ec9c5c",
              "status": "pending",
              "__typename": "ConnectionType"
          }


          
  2.
    a. if two username are the same, then it's the same profile i.e show logout and edit button
    b. if user is not logged in, show no ctas

  3. connectiontType is null we show connect button
          a. once sent we show requested button
  4. if connectionType is pending, show requested button
  5. if connectionType is accepted, show message button








*/






function UserCtaBtns({ data, loading }: { data: any, loading: boolean}) {
  const [present, dismiss] = useIonToast();
  const [connectionType, setConnectionType] = useState(
    data.connectionType || {}
  );
  const { user } = useAuth(),
  { username: loggedInUser} = user || {},
  params = useParams(),
  {username:profileBelongsTo} = params || {};

  console.log(connectionType,   data.connectionType )
  const history = useHistory();
  const [thisIsMyProfile, setThisisMyProfile] = useState(loggedInUser === profileBelongsTo);
  const [requestSent, setRequestSent] = useState(false);
  const [requestAccepted, setRequestAccepted] = useState(false);

  useEffect(() => {
    setConnectionType( data.connectionType || {})
    setThisisMyProfile(loggedInUser === profileBelongsTo)
  },[loading])
  
  const [sendConnectRequest] = useSendConnectRequest({SendConnectRequest, present, dismiss, USER_SERVICE_GQL, setRequestSent});
  const [acceptConnectRequest] = useAcceptConnectRequest({AcceptConnectRequest, getUserGql, present, dismiss, USER_SERVICE_GQL, setRequestAccepted, user, profileBelongsTo});

  const MessageState = () => (
    <IonButton
      color="light"
      mode="ios"
      className="icon-text"
      onClick={() => history.push("/messages")}
    >
      <IonIcon className="grey-icon-32 mr-1" icon={chatbubbles} />
      {"Message"}
    </IonButton>
  );
  const RequestedState = () => (
    <IonButton  mode="ios" className="icon-text" color="warning" style={{color:"white"}}>
    <IonIcon className="white-icon-32 mr-1 txt-white" icon={personAdd} />
    Requested
  </IonButton>
  )
  const AcceptCurrentRequest = () => (
    <IonButton
    color="success"
    mode="ios"
    className="icon-text"
    onClick={() => {
      acceptConnectRequest({
        variables: { requestorId: data._id },
      });
    }}
  >
    <IonIcon className="white-icon-32 mr-1" icon={personAdd} />
    {"Accept"}
  </IonButton>
  )
  const CancelRequest = () =>(
    <IonButton
            color="secondary"
            mode="ios"
            className="icon-text"
            onClick={() =>
              sendConnectRequest({
                variables: { receiverId: data._id },
              })
            }
          >
            <IonIcon className="white-icon-32 mr-1" icon={personAdd} />
            {"Connect"}
    </IonButton>
  )

  const Default = () =>(
    <IonButton
            color="secondary"
            mode="ios"
            className="icon-text"
            onClick={() =>
              sendConnectRequest({
                variables: { receiverId: data._id },
              })
            }
          >
            <IonIcon className="white-icon-32 mr-1" icon={personAdd} />
            {"Connect"}
    </IonButton>
  )


  // const flows = {
  //   pending: RequestedState,
  //   accepted: MessageState,
  //   default: Default,
  //   approveRequest: AcceptCurrentRequest
  // };

  console.log('00000000011111')
  console.log({requestSent, connectionType: connectionType.status , requestAccepted})
  const ButtonToShow = () => {
    if (!loggedInUser) {
      return null;
    }
    if (!connectionType) return null; // Defensive check

    if (thisIsMyProfile) {
      return <EditProfile profileHeader={data} setProfileHeader={data} />;
    }

    // either request is sent or received
    // if request is sent, show requested button
    // if request is received, show accept button
    if(['pending', 'requested'].includes(connectionType?.status)  || requestSent){
      return (connectionType.receiverId === data._id || requestSent)? (
        <RequestedState />
      ) : (
        <AcceptCurrentRequest />
      );
    }
    
    if(connectionType.status  === 'accepted'|| requestAccepted){
      return <MessageState />;
    }
      
    return <Default />;
  }

  return (
    <>
      <div className="user-cta-btns">
        <ButtonToShow />
      </div>
    </>
  );
}

export default UserCtaBtns;
