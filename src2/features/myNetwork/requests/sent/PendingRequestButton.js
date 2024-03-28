import { useState } from "react"
import { IonButton, useIonToast } from "@ionic/react"
import { useMutation } from "@apollo/client"
import { getUserGql, RemoveConnectRequest } from "@graphql/user/"
import { USER_SERVICE_GQL } from "servers/types"

function PendingRequestButton({ user }) {
  const [cancel, setCancel] = useState(false)
  const [present, dismiss] = useIonToast()

  const [removeConnectRequest] = useMutation(RemoveConnectRequest, {
    context: { server: USER_SERVICE_GQL },
    update: (cache) => {
      const getUser = cache.readQuery({
        query: getUserGql,
        variables: { username: user.user.username }
      })
      getUser &&
        cache.writeQuery({
          query: getUserGql,
          variables: { username: user.user.username },
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
        setCancel(true)
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

  return (
    <IonButton
      color="dark"
      mode="ios"
      className="outline-button"
      expand="block"
      fill="outline"
      disabled={cancel}
      onClick={() => {
        removeConnectRequest({
          variables: { connecteeId: user.user._id }
        })
      }}
    >
      {cancel ? "Canceled" : "Cancel"}
    </IonButton>
  )
}

export default PendingRequestButton
