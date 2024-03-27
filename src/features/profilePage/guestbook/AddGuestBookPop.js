import { useState } from "react"
import { useMutation } from "@apollo/client"
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast
} from "@ionic/react"
import "./index.css"
 import {sendGuestbookMessage} from "graphql/user"
import {USER_SERVICE_GQL} from "servers/types"

const AddGuestBookPop = ({ isOpen, setIsOpen, userId, refetch }) => {
  const [message, setMessage] = useState("")
  const [present, dismiss] = useIonToast()

  const [executeMutation] = useMutation(sendGuestbookMessage, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      receiverId: userId,
      message: message
    },
    onCompleted: (data) => {
      if (data.sendGuestbookMessage.status.success) {
        present({
          duration: 3000,
          message: data.sendGuestbookMessage.status.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "primary",
          mode: "ios"
        })
        setIsOpen(false)
        refetch()
      }
    },
    onError: (error) => {
      if (error) {
        present({
          duration: 3000,
          message: error.message,
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios"
        })
      }
    }
  })

  const handelSubmit = (e) => {
    e.preventDefault()
    message && executeMutation()
  }

  return (
    <IonModal
      onDidDismiss={() => {
        setIsOpen(false)
      }}
      isOpen={isOpen}
      mode="ios"
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Education</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding modal-content">
        <form onSubmit={handelSubmit}>
          <div className="mb-1">
            <h5>message</h5>
            <IonTextarea
              mode="md"
              className="input-box guestbook-textarea"
              name="message"
              style={{
                minHeight: "300px"
              }}
              onIonChange={(e) => {
                setMessage(e.target.value)
              }}
              autoGrow
              placeholder="Message"
              required
              value={message}
            ></IonTextarea>
          </div>
          <IonButton type="submit" mode="ios" expand="block">
            Save Changes
          </IonButton>
        </form>
      </IonContent>
    </IonModal>
  )
}

export default AddGuestBookPop
