import React from "react"
import {copyOutline} from "ionicons/icons"
import {IonIcon, IonItem, IonLabel, useIonToast} from "@ionic/react"
import { trackEvent } from "@components/analytics"

const CopyLink = ({link}) => {
  const [present, dismiss] = useIonToast()

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link).then(() => {
        present({
          message: "Link Copied",
          duration: 2000,
          position: "bottom",
          color: "success"
        })
        trackEvent({
          action: "Link_copied",
          category: "engagement",
          label: `${link}`
        })
      }).catch((err) => {
        // Handle potential write errors here
        console.log("Copy failed", err)
        present({
          message: "Copy failed. Please try again.",
          duration: 2000,
          position: "bottom",
          color: "danger"
        })
      })
    } else {
      // Clipboard API not available
      console.log("Clipboard API not available")
      present({
        message: "Copying not supported in this browser.",
        duration: 2000,
        position: "bottom",
        color: "danger"
      })
      trackEvent({
        action: "Copy_link_failed",
        category: "engagement",
        label: "Copying not supported in this browser"
      })
    }
  }

  return (
    <IonItem
      lines="none"
      button
      onClick={copyToClipboard}
      className="ion-no-margin hover:bg-opacity-70 ion-no-padding"
    >
      <IonIcon style={{fontSize: "25px"}} slot="start" icon={copyOutline} />
      <IonLabel>Copy Link</IonLabel>
    </IonItem>
  )
}

export default CopyLink
