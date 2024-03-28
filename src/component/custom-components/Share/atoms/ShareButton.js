import React, { useRef, useState } from "react"
import { IonIcon, IonButton, IonContent, IonPopover } from "@ionic/react"
import { shareSocialOutline } from "ionicons/icons"
import ListOptions from "../organism/ListOptions"

const ShareButton = ({ allProps }) => {
  const {
    link,
    btnstyle = {
      width: "40px",
      height: "40px"
    },
    Iconstyle = {
      color: "blue"
    }
  } = allProps
  const popover = useRef(null)
  const [popoverOpen, setPopoverOpen] = useState(false)

  const openPopover = (e) => {
    popover.current.event = e
    setPopoverOpen(true)
  }

  return (
    <div>
      <IonButton
        fill="clear"
        color="primary"
        onClick={openPopover}
        style={{ ...btnstyle }}
        className="  rounded-full  overflow-hidden ion-no-margin ion-no-padding  outline-none"
      >
        <IonIcon
          style={{ ...Iconstyle }}
          className=" rounded-full p-2 h-full ion-no-padding ion-no-margin  text-3xl w-full block  "
          icon={shareSocialOutline}
        />
      </IonButton>
      <IonPopover
        ref={popover}
        isOpen={popoverOpen}
        onDidDismiss={() => setPopoverOpen(false)}
      >
        <IonContent class="ion-padding">
          <ListOptions allProps={allProps} />
        </IonContent>
      </IonPopover>
    </div>
  )
}

export default ShareButton
