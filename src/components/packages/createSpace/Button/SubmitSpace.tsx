import { IonButton, IonItem, IonSpinner, IonText } from "@ionic/react"
import React from "react"

const SubmitSpace = ({ redirecting }) => {
  return (
    <IonButton className="mt-4" slot="end" type="submit">
      {redirecting ? (
        <IonItem className="text-white font-bold" color={"transparent"}>
          <IonText className="">REDIRECTING...</IonText>
          <IonSpinner name="crescent" color={"white"} />
        </IonItem>
      ) : (
        "Create"
      )}
    </IonButton>
  )
}

export default SubmitSpace
