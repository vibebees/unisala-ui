import { IonRadio, IonRow, IonText } from "@ionic/react"

const InvitationType = ({ allProps }) => {
  const { handleCheckbox, label, value } = allProps
  return (
    <IonRow className="flex flex-row items-center">
      <IonRadio onIonFocus={handleCheckbox} value={value} className="mr-2">
        {""}
      </IonRadio>
      <IonText className="text-sm  font-medium  text-neutral-600">
        {label}
      </IonText>
    </IonRow>
  )
}

export default InvitationType

