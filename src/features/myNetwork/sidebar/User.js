import { useState } from "react"
import { useHistory } from "react-router-dom"
import {
  IonItem,
  IonAvatar,
  IonLabel,
  IonButton,
  useIonToast
} from "@ionic/react"
import {
  RemoveConnectRequest,
  SendConnectRequest
} from "graphql/user/"
import { USER_SERVICE_GQL } from "servers/types"
import { Avatar } from "component/Avatar"
import { useMutation } from "@apollo/client"

export default function User({ item, setIsOpen, isOpen }) {
  const [disconnected, setDisconnected] = useState(false)
  const history = useHistory()
  const [present, dismiss] = useIonToast()
  const [removeConnectRequest] = useMutation(RemoveConnectRequest, {
    context: { server: USER_SERVICE_GQL },
    onError: (error) => {
      present({
        duration: 3000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
  })

  const [connectRequest] = useMutation(SendConnectRequest, {
    context: { server: USER_SERVICE_GQL },
    onError: (error) => {
      present({
        duration: 3000,
        message: error.message,
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
  })

  const handleConnection = (item) => {
    if (!disconnected) {
      removeConnectRequest({
        variables: { connecteeId: item.user._id }
      })
      setDisconnected(true)
    } else {
      connectRequest({
        variables: { receiverId: item.user._id }
      })
      setDisconnected(false)
    }
  }

  const handleUserProfile = () => {
    setIsOpen(false)
    history.push(`/@/${item.user.username}`)
  }

  return (
    <IonItem mode="ios" className="mb-1" lines="full">
      <IonAvatar slot="start">
        <Avatar username={item?.user?.username} profilePic={item?.user?.picture} />
      </IonAvatar>
      <IonLabel>
        <div className="flex">
          <div
            style={{
              cursor: "pointer"
            }}
            // onClick={handleUserProfile}
          >
            <h2>{item?.user?.firstName + " " + item?.user?.lastName}</h2>
            <p>{item?.user?.username}</p>
          </div>
          <IonButton
            mode="ios"
            onClick={() => handleConnection(item)}
            color="dark"
            fill="outline"
          >
            {!disconnected ? "Disconnect" : "Connect"}
          </IonButton>
        </div>
      </IonLabel>
    </IonItem>
  )
}
