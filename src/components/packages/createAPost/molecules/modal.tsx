import React from "react"
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonModal,
    IonTitle,
    IonToolbar
  } from "@ionic/react"
  import { useState } from "react"
import { Button } from "../../../defaults"

  export const CreateAPostModal = ({ ModalButton, ModalData = "No Data", header = "Modal" }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <div className="ion-padding p-0">
          <div onClick={() => setIsOpen(true)} className="cursor-pointer p-0">
            {ModalButton}
          </div>
          <IonModal
            mode="ios"
            onDidDismiss={() => {
              setIsOpen(false)
            }}
            isOpen={isOpen}
          >
            <IonHeader>
              <IonToolbar>
                <IonTitle>{header}</IonTitle>
                <IonButtons slot="end">
                  <Button
                    className="modal-close-btn"
                    onClick={() => setIsOpen(false)}
                  >
                    close
                  </Button>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">{ModalData}</IonContent>
          </IonModal>
        </div>
      </>
    )
  }

