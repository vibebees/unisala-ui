import React from "react"
import { IonIcon, IonItem, IonLabel } from "@ionic/react"

const SocialMediaShare = ({ Icon, title, type, redirectURL }) => {
  let url = ""
  if (type === "facebook") {
    url = `https://www.facebook.com/sharer/sharer.php?u=${redirectURL}`
  } else if (type === "twitter") {
    url = `https://twitter.com/intent/tweet?url=${redirectURL}`
  } else if (type === "whatsApp") {
    url = `whatsapp://send?text=${redirectURL}`
  }

  return (
    <a href={`${url}`} target="_blank" rel="noreferrer">
      <IonItem
        lines="none"
        button
        className="ion-no-margin hover:bg-opacity-70  ion-no-padding"
      >
        <IonIcon style={{ fontSize: "25px" }} slot="start" icon={Icon} />
        <IonLabel>{title}</IonLabel>
      </IonItem>
    </a>
  )
}

export default SocialMediaShare
