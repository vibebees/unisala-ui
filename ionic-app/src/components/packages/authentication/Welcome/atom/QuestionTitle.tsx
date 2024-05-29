import React from "react"
import { IonText } from "@ionic/react"

const QuestionTitle = ({ title = "" }) => {
  return (
    <IonText color="primary">
      <h1 className="font-semibold text-xl text-neutral-600">{title}</h1>
    </IonText>
  )
}

export default QuestionTitle
