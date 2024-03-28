import { useMutation } from "@apollo/client"
import { IonButton, IonSpinner, useIonToast } from "@ionic/react"
import { RegisterUserEvent } from "@graphql/user"
import { useState } from "react"
import { useSelector } from "react-redux"
import { USER_SERVICE_GQL } from "servers/types"

const RegisterButton = ({ event }) => {
  const { user } = useSelector((store) => store?.userProfile)

  const [isRegisteredUser, setIsRegisteredUser] = useState(
    event.interestedUsers.find((u) => u?.userId === user?._id)
  )
  const [present, dismiss] = useIonToast()
  const [RegisterUnRegisterUser, { loading }] = useMutation(RegisterUserEvent, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data) => {
      if (data?.registeredUserByEventId?.status?.success) {
        present({
          duration: 3000,
          message:
            data?.registeredUserByEventId?.status?.message ||
            "You are registered successfully",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
        if (isRegisteredUser) {
          setIsRegisteredUser(false)
        } else {
          setIsRegisteredUser(true)
        }
      } else {
        present({
          duration: 3000,
          message:
            data?.registeredUserByEventId?.status?.message ||
            "Something went wrong",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      }
    },
    onError: (error) => {
      present({
        duration: 30000,
        message: error?.message || "Something went wrong",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios"
      })
    }
  })
  console.log({ eventId: event._id })
  const handleRegister = () => {
    if (isRegisteredUser) {
      RegisterUnRegisterUser({
        variables: {
          userId: user._id,
          eventId: event._id,
          type: "unregistered"
        }
      })
    } else {
      RegisterUnRegisterUser({
        variables: {
          userId: user._id,
          eventId: event._id
        }
      })
    }
  }
  return (
    <IonButton
      disabled={loading}
      expand="block"
      color={isRegisteredUser ? "success" : "primary"}
      onClick={handleRegister}
    >
      {isRegisteredUser ? "Registered" : "Register"}

      {loading && <IonSpinner name="lines"></IonSpinner>}
    </IonButton>
  )
}

export default RegisterButton

