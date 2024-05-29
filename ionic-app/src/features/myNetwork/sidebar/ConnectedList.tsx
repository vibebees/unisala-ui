import {
  IonModal,
  IonHeader,
  IonButtons,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton
} from "@ionic/react"
import StateMessage from "../../../components/packages/stateMessage"
import User from "./User"

export default function ConnectedList({ isOpen, setIsOpen, data }) {
  return (
    <IonModal isOpen={isOpen} mode="ios" onDidDismiss={() => setIsOpen(false)}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Manage Connection</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                setIsOpen(false)
              }}
            >
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding modal-content">
        {data?.connectedList?.connectionList &&
          data?.connectedList?.connectionList.map((item, index) => {
            return (
              <User
                item={item}
                key={index}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              />
            )
          })}
        {(!data?.connectedList?.connectionList ||
          !data?.connectedList?.connectionList.length) && (
          <StateMessage
            title="No Connections yet"
            subtitle="Add connections to see them here"
          />
        )}
      </IonContent>
    </IonModal>
  )
}
