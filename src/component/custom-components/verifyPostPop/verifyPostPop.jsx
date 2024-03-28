// eslint-disable-next-line no-use-before-define
import React from "react"
import {
  IonIcon,
  IonCard,
  IonItem,
  IonAvatar,
  IonLabel,
  IonButtons,
  IonModal,
  IonCheckbox,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonInput,
  IonToggle,
  IonText
} from "@ionic/react"
import {
  checkmarkCircle,
  document,
  home,
  settings,
  sunny
} from "ionicons/icons"
import { Link } from "react-router-dom"
import "./index.css"
export const VerifyPostPop = ({ popup = false, setPopup }) => {
  return (
    <IonModal
      className="post-popup"
      onDidDismiss={() => setPopup(false)}
      isOpen={popup}
    >
      <IonHeader className="verify_header">
        <IonToolbar>
          <IonTitle>Verify post</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setPopup(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <div className="ion-margin">
        <IonText color="dark">
          <p>Make sure this question has the right topics:.</p>
        </IonText>
        <IonItem>
          <IonLabel position="floating">Add a topic</IonLabel>
          <IonInput placeholder="Enter text"></IonInput>
        </IonItem>
      </div>
      <div className="ion-margin-start">
        <IonItem lines="none">
          <IonIcon icon={checkmarkCircle} />
          <IonLabel className="ion-margin-start" color="dark">
            <h2>Verify that these topics describe this question.</h2>
          </IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonCheckbox slot="start"></IonCheckbox>
          <IonLabel>University in USA</IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonCheckbox slot="start"></IonCheckbox>
          <IonLabel>Best University</IonLabel>
        </IonItem>
      </div>
      <div className="ion-margin-start">
        <IonItem lines="none">
          <IonIcon icon={sunny} />
          <IonLabel className="ion-margin-start" color="dark">
            <h2>Select any topics that also describe this question.</h2>
          </IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonCheckbox slot="start"></IonCheckbox>
          <IonLabel>Enrollment</IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonCheckbox slot="start"></IonCheckbox>
          <IonLabel>Placement</IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonCheckbox slot="start"></IonCheckbox>
          <IonLabel>scholarship</IonLabel>
        </IonItem>
      </div>
    </IonModal>
  )
}
export default VerifyPostPop
