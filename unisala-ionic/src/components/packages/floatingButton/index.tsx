import React, { lazy } from "react"
import { Fab, FabButton,  Modal } from "../../defaults/index"
import { helpOutline } from "ionicons/icons"
 import Feedback from "./organism/Feedback"

function index({
  ModalData = Feedback,
  Icon = helpOutline,
  header = "Feedback"
}) {
  return (
    <Fab
      slot="fixed"
      horizontal="end"
      vertical="bottom"
      className="mr-8 mb-3 max-md:mr-3 max-md:mb-1"
    >
      <Modal
        ModalButton={
          <FabButton
            onclick={() => {
              // ButtonTrack("Feedback button clicked")
            }}
            size="small"
          >
            <Icon icon={Icon}></Icon>
          </FabButton>
        }
        ModalData={<ModalData />}
        header={header}
      />
    </Fab>
  )
}
export default index
