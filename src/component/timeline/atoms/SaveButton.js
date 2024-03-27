import { IonButton, IonSpinner } from "@ionic/react"

const SaveButton = ({ loading = false, label = "Save", onClick }) => {
  return (
    <IonButton
      color={"medium"}
      onClick={onClick}
      className="h-full ion-no-margin capitalize  shadow-none"
    >
      {loading ? <IonSpinner name="lines" /> : label}
    </IonButton>
  )
}

export default SaveButton
