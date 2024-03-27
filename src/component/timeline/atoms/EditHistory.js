import React, { useState } from "react"
import { IonRow, IonCol, IonButton, IonIcon, IonInput } from "@ionic/react"
import { checkmarkCircle } from "ionicons/icons"

const EditHistory = ({ text }) => {
  const [value, setvalue] = useState(text)

  return (
    <IonRow className="ion-no-padding ion-no-margin w-full">
      <IonCol className="ion-no-padding ion-no-margin">
        <IonInput
          className="text-sm opacity-70 ion-no-padding !pl-2 ion-no-margin w-full h-full"
          placeholder="Edit History"
          value={value}
          onIonChange={(e) => setvalue(e.target.value)}
        ></IonInput>
      </IonCol>
      <IonCol size="auto" className="h-full">
        <IonButton
          fill="clear"
          color="primary"
          className="text-sm border ion-no-margin "
        >
          <IonIcon className="text-3xl" icon={checkmarkCircle} />
        </IonButton>
      </IonCol>
    </IonRow>
  )
}

export default EditHistory
