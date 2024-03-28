import { IonSpinner, IonText } from "@ionic/react"
import "./index.css"

export const PreLoader = () => {
  return (
    <div className="preloader_content">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUsQiplH_OWtHnMb1Nrk31z58OJN009JG-w&usqp=CAU"
        alt=""
      />
      <IonText color="medium">
        <h1>Unisala</h1>
      </IonText>
      <IonSpinner name="dots" />
    </div>
  )
}
