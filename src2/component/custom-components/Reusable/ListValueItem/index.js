import React from "react"
import { IonItem, IonCard, IonLabel, IonText } from "@ionic/react"

const index = ({ label, value }) => {
  return (
    <IonItem>
      <IonText className="flex ion-paddings shadow-none w-full shrink-0 flex-col py-2">
        <IonLabel>{label}</IonLabel>
        <span className="!text-sm tracking-wide mt-1 text-neutral-500">
          {value}
        </span>
      </IonText>
    </IonItem>
  )
}

export default index
