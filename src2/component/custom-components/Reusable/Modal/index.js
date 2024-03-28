import React, { useEffect, useState } from "react"
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle
} from "@ionic/react"

const index = ({ ModalButton, ModalData = "No Data", header = "Modal" }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="ion-padding p-0">
        <div onClick={() => setIsOpen(true)} className="cursor-pointer p-0">
          {ModalButton}
        </div>
        <IonModal mode="ios" isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{header}</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  className="modal-close-btn"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">{ModalData}</IonContent>
        </IonModal>
      </div>
    </>
  )
}

export default index
