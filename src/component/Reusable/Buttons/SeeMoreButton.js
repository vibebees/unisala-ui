import React from "react"
import { IonIcon } from "@ionic/react"
import { ellipsisVerticalCircleOutline } from "ionicons/icons"

const SeeMoreButton = () => {
  return (
    <IonIcon
      style={{
        fontSize: "22px",
        alignSelf: "center"
      }}
      className="ion-icon text-neutral-500"
      icon={ellipsisVerticalCircleOutline}
    />
  )
}

export default SeeMoreButton
