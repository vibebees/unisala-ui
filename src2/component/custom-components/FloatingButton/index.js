import React, { lazy } from "react"
import { IonFab, IonFabButton, IonIcon } from "@ionic/react"
import { helpOutline } from "ionicons/icons"
import Modal from "component/defaults/Modal"
import Feedback from "./organism/Feedback"
import { ButtonTrack } from "features/analytics/ButtonTrack"

function index({
  ModalData = Feedback,
  Icon = helpOutline,
  header = "Feedback"
}) {
  return (
    <IonFab
      slot="fixed"
      horizontal="end"
      vertical="bottom"
      className="mr-8 mb-3 max-md:mr-3 max-md:mb-1"
    >
      <Modal
        ModalButton={
          <IonFabButton
            onclick={() => {
              ButtonTrack("Feedback button clicked")
            }}
            size="small"
          >
            <IonIcon icon={Icon}></IonIcon>
          </IonFabButton>
        }
        ModalData={<ModalData />}
        header={header}
      />
    </IonFab>
  )
}
export default index
