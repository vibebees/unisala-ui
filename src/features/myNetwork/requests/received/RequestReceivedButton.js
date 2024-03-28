import { useState } from "react"
import { IonButton, useIonToast } from "@ionic/react"
import { useMutation } from "@apollo/client"
import {
  AcceptConnectRequest,
  getUserGql,
  RemoveConnectRequest
} from "@graphql/user/"
import { USER_SERVICE_GQL } from "servers/types"

function RequestReceivedButton({ reqUserId, reqUsername }) {
  const [decline, setDecline] = useState(false)
  const [accept, setAccept] = useState(false)
  const [present, dismiss] = useIonToast()

  const [removeConnectRequest] = useMutation(RemoveConnectRequest, {
    context: { server: USER_SERVICE_GQL },
    update: (cache) => {
      const getUser = cache.readQuery({
        query: getUserGql,
        variables: { username: reqUsername }
      })
      getUser &&
        cache.writeQuery({
          query: getUserGql,
          variables: { username: reqUsername },
          data: {
            getUser: {
              ...getUser.getUser,
              connectionType: null,
              user: getUser.getUser.user
            }
          }
        })
    },
    onCompleted: (data) => {
      if (data.removeConnectRequest.success) {
        setDecline(true)
      }
    },
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

  const [acceptConnectRequest] = useMutation(AcceptConnectRequest, {
    context: { server: USER_SERVICE_GQL },
    update: (cache) => {
      const getUser = cache.readQuery({
        query: getUserGql,
        variables: { username: reqUsername }
      })
      getUser &&
        cache.writeQuery({
          query: getUserGql,
          variables: { username: reqUsername },
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
        })
    },
    onCompleted: (data) => {
      if (data.acceptConnectRequest.success) {
        setAccept(true)
      }
    },
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

  if (accept) {
    return (
      <IonButton
        color="primary"
        mode="ios"
        className="outline-button"
        expand="block"
        disabled={true}
      >
        Accepted
      </IonButton>
    )
  }

  if (decline) {
    return (
      <IonButton
        color="primary"
        mode="ios"
        className="outline-button"
        expand="block"
        disabled={true}
      >
        Declined
      </IonButton>
    )
  }

  return (
    (!decline || !accept) && (
      <>
        <IonButton
          color="primary"
          mode="ios"
          className="outline-button"
          expand="block"
          onClick={() => {
            acceptConnectRequest({
              variables: { requestorId: reqUserId }
            })
          }}
        >
          Accept
        </IonButton>

        <IonButton
          color="dark"
          mode="ios"
          className="outline-button"
          expand="block"
          fill="outline"
          disabled={decline}
          onClick={() => {
            removeConnectRequest({
              variables: { connecteeId: reqUserId }
            })
          }}
        >
          Decline
        </IonButton>
      </>
    )
  )
}

export default RequestReceivedButton
