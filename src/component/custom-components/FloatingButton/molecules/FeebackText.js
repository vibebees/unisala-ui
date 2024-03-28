import React from "react"
import {
  IonTextarea,
  IonInput,
  IonButton,
  IonCol,
  IonText,
  IonIcon
} from "@ionic/react"
import clsx from "clsx"
import { informationCircleOutline } from "ionicons/icons"

const FeebackText = ({ allProps }) => {
  const { feedBack, Setfeedback, handleSubmit } = allProps
  const handleFeedbackTextChange = (e) => {
    Setfeedback({ ...feedBack, description: e.detail.value })
  }

  const handleEmailChange = (e) => {
    Setfeedback({ ...feedBack, email: e.detail.value })
  }

  const buttonClass = clsx("btn mt-2")
  return (
    <IonCol>
      <div className="feedback">
        <IonTextarea
          placeholder="What can we do to improve?"
          onIonChange={handleFeedbackTextChange}
          value={feedBack.description}
          rows={5}
          className="border focus-within:border-neutral-500 border-neutral-300 text-sm rounded-md"
        ></IonTextarea>
        <IonInput
          type="text"
          placeholder="Your Email (optional)"
          onIonChange={handleEmailChange}
          value={feedBack.email}
          className="border focus-within:border-neutral-500 border-neutral-300 rounded-md mt-2"
        ></IonInput>
        <IonText className="flex items-center justify-start gap-1 my-3 text-green-500 ml-1 text-xs">
          <IonIcon
            size="small"
            className="text-green-600 "
            icon={informationCircleOutline}
          ></IonIcon>
          Providing your email can help us address any issues or follow up on
          your feedback if needed.
        </IonText>

        <IonButton onClick={handleSubmit} className={buttonClass}>
          Send Your Feedback
        </IonButton>
      </div>
    </IonCol>
  )
}

export default FeebackText
