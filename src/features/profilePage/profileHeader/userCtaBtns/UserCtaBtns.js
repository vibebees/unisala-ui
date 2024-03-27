import { useState } from "react"
import { chatbubbles, personAdd } from "ionicons/icons"
import { IonButton, IonIcon, useIonToast } from "@ionic/react"
import { useMutation } from "@apollo/client"
import {
  SendConnectRequest,
  AcceptConnectRequest
} from "graphql/user/"
import useWindowWidth from "hooks/useWindowWidth"
import EditProfile from "../editProfile"
import "./UserCtaBtns.css"
import { USER_SERVICE_GQL } from "servers/types"

function UserCtaBtns({ profileHeader, setProfileHeader, myProfile }) {
  let windowWidth = useWindowWidth()
  const [present, dismiss] = useIonToast()
  const [connectionType, setConnectionType] = useState(
    profileHeader.connectionType
  )

  const [sendConnectRequest] = useMutation(SendConnectRequest, {
    onCompleted: (data) => {
      if (data.sendConnectRequest.success) {
        setConnectionType({ status: "pending", receiverId: profileHeader._id })
        present({
          duration: 3000,
          message: "Connect request sent",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      }
    },
    context: { server: USER_SERVICE_GQL }
  })

  const [acceptConnectRequest] = useMutation(AcceptConnectRequest, {
    onCompleted: (data) => {
      if (data.acceptConnectRequest.success) {
        setConnectionType({ status: "accepted" })
        present({
          duration: 3000,
          message: "Connect request accepted",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
      }
    }
  })

  const ButtonToShow = () => {
    if (myProfile) {
      return (
        <EditProfile
          profileHeader={profileHeader}
          setProfileHeader={setProfileHeader}
        />
      )
    }

    if (!connectionType) {
      return (
        <IonButton
          color="secondary"
          mode="ios"
          className="icon-text"
          onClick={() => {
            sendConnectRequest({
              variables: { receiverId: profileHeader._id }
            })
          }}
        >
          <IonIcon className="white-icon-32 mr-1" icon={personAdd} />
          {windowWidth >= 768 && "Connect"}
        </IonButton>
      )
    }

    if (
      connectionType.receiverId === profileHeader._id &&
      connectionType.status === "pending"
    ) {
      return (
        <IonButton color="light" mode="ios" className="icon-text">
          <IonIcon className="grey-icon-32 mr-1" icon={personAdd} />
          {windowWidth >= 768 && "Requested"}
        </IonButton>
      )
    }

    if (
      connectionType.requestorId === profileHeader._id &&
      connectionType.status === "pending"
    ) {
      return (
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
          {windowWidth >= 768 && "Accept"}
        </IonButton>
      )
    }

    return (
      <>
        <IonButton color="light" mode="ios" className="icon-text">
          <IonIcon className="grey-icon-32 mr-1" icon={chatbubbles} />
          {windowWidth >= 768 && "Message"}
        </IonButton>
      </>
    )
  }

  return (
    <>
      <div className="user-cta-btns">
        <ButtonToShow />
      </div>
    </>
  )
}

export default UserCtaBtns
