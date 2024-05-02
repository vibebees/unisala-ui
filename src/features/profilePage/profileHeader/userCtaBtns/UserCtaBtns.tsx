import React from "react";
import { useState } from "react";
import { chatbubbles, personAdd } from "ionicons/icons";
import { IonButton, IonIcon, useIonToast } from "@ionic/react";
import { useMutation } from "@apollo/client";
import { SendConnectRequest, AcceptConnectRequest, getUserGql } from "@datasource/graphql/user";
import EditProfile from "../editProfile";
import "./UserCtaBtns.css";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { useAuth } from "@context/AuthContext";
import { useHistory } from "react-router";

function UserCtaBtns({ profileHeader, setProfileHeader, myProfile }) {

  const [present, dismiss] = useIonToast();
  const [connectionType, setConnectionType] = useState(profileHeader.connectionType || {});
  const { user } = useAuth();
  const history = useHistory();

  const [sendConnectRequest] = useMutation(SendConnectRequest, {
    onCompleted: (data) => {
      if (data.sendConnectRequest && data.sendConnectRequest.success) {
        setConnectionType({ status: "pending", receiverId: profileHeader._id });
        present({
          duration: 3000,
          message: "Connect request sent",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        });
      }
    },
    onError: (error) => {
      present({
        duration: 3000,
        message: `Error sending connect request: ${error.message}`,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      });
    },
    context: { server: USER_SERVICE_GQL }
  });

  const [acceptConnectRequest] = useMutation(AcceptConnectRequest, {
    context: { server: USER_SERVICE_GQL },
    update: (cache) => {
      const getUser = cache.readQuery({
        query: getUserGql,
        variables: { username: user?.username }
      });
      if (getUser) {
        cache.writeQuery({
          query: getUserGql,
          variables: { username: user?.username },
          data: {
            getUser: {
              ...getUser.getUser,
              connectionType: {
                ...getUser.getUser.connectionType,
                status: "accepted"
              },
              user: getUser.getUser.user
            }
          }
        });
      }
    },
    onCompleted: (data) => {
      if (data.acceptConnectRequest && data.acceptConnectRequest.success) {
        setConnectionType({ ...connectionType, status: "accepted" });
        present({
          duration: 3000,
          message: "Connect request accepted. You can now send messages.",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "success",
          mode: "ios"
        });
      }
    },
    onError: (error) => {
      present({
        duration: 3000,
        message: `Error accepting connect request: ${error.message}`,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      });
    }
  });

  const AcceptedState = () => {
    return (
      <IonButton color="light" mode="ios" className="icon-text" onClick={() => history.push('/messages')}>
        <IonIcon className="grey-icon-32 mr-1" icon={chatbubbles} />
        {"Message"}
      </IonButton>
    );
  };

  const ButtonToShow = () => {
    if (!connectionType) return null; // Defensive check

    if (myProfile) {
      return (
        <EditProfile
          profileHeader={profileHeader}
          setProfileHeader={setProfileHeader}
        />
      );
    }

    switch (connectionType.status) {
      case "pending":
        return connectionType.receiverId === profileHeader._id ? (
          <IonButton color="light" mode="ios" className="icon-text">
            <IonIcon className="grey-icon-32 mr-1" icon={personAdd} />
            {"Requested"}
          </IonButton>
        ) : (
          <IonButton
            color="success"
            mode="ios"
            className="icon-text"
            onClick={() => {
              acceptConnectRequest({
                variables: { requestorId: profileHeader._id }
              })
            }}
          >
            <IonIcon className="white-icon-32 mr-1" icon={personAdd} />
            {"Accept"}
          </IonButton>
        );
      case "accepted":
        return AcceptedState();
      default:
        return (
          <IonButton
            color="secondary"
            mode="ios"
            className="icon-text"
            onClick={() => sendConnectRequest({
              variables: { receiverId: profileHeader._id }
            })}
          >
            <IonIcon className="white-icon-32 mr-1" icon={personAdd} />
            {"Connect"}
          </IonButton>
        );
    }
  };

  return (
    <>
      <div className="user-cta-btns">
        <ButtonToShow />
      </div>
    </>
  );
}

export default UserCtaBtns;
