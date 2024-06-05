import { useState } from "react"
import { IonButton } from "@ionic/react"
import { useMutation } from "@apollo/client"
import { SendConnectRequest, RemoveConnectRequest } from "../../../datasource/graphql/user"
import { USER_SERVICE_GQL } from "../../../datasource/servers/types"
function ConnectButton({ user }) {
  const [connect, setConnect] = useState(false)
  const [sendConnectRequest] = useMutation(SendConnectRequest, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data) => {
      if (data.sendConnectRequest.success) {
        setConnect(true)
      }
    }
  })

  const [removeConnectRequest] = useMutation(RemoveConnectRequest, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data) => {
      if (data.removeConnectRequest.success) {
        setConnect(false)
      }
    }
  })

  return (
    <IonButton
      color={connect ? "dark" : "primary"}
      mode="ios"
      className="outline-button"
      expand="block"
      fill="outline"
      onClick={() => {
        !connect
          ? sendConnectRequest({
              variables: { receiverId: user._id }
            })
          : removeConnectRequest({
              variables: { connecteeId: user._id }
            })
      }}
    >
      {connect ? "cancel" : "connect"}
    </IonButton>
  )
}

export default ConnectButton
