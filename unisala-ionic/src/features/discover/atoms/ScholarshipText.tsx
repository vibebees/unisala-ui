import React from "react"
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonRow,
  IonCol,
  IonChip,
  IonIcon,
  IonText
} from "@ionic/react"

const ScholarshipText = ({ icon, header, value, color = "black" }) => {
  return (
    <IonRow className="flex-col h-fit gap-1">
      <IonCol className="items-center flex w-fit gap-2">
        <IonIcon className="text-lg" style={{ color }} icon={icon} />{" "}
        <IonText className="font-semibold " style={{ color }}>
          {header}
        </IonText>
      </IonCol>
      <IonCol size="auto" className="ml-7  ">
        <IonText className="text-black tracking-wide h-full">{value}</IonText>
      </IonCol>
    </IonRow>
  )
}

export default ScholarshipText
