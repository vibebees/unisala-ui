import React from "react"
import QuestionTitle from "../atom/QuestionTitle"
import { IonCardSubtitle, IonGrid } from "@ionic/react"

const Headers = ({ title = "", subtitle = "" }) => {
  return (
    <>
      <IonGrid>
        <QuestionTitle title={title} />
      </IonGrid>
      <IonCardSubtitle className="text-start ml-1">{subtitle}</IonCardSubtitle>
    </>
  )
}

export default Headers
