import React from "react"
import FileUploader from "../atoms/FileUploader"
import { IonCard, IonText, IonCardSubtitle } from "@ionic/react"
import Header from "../atoms/Header"

const SendInvitationAll = () => {
  return (
    <IonCard className="ion-no-margin rounded-b-none w-full border-b border-neutral-300 h-full ion-no-padding shadow-none px-4 py-6">
      <Header
        header={"Send Invitation All"}
        subHeader={
          "Upload an Excel file with the list of email addresses of the people you want to invite to your space"
        }
      />
      <br />

      <FileUploader />
    </IonCard>
  )
}

export default SendInvitationAll
