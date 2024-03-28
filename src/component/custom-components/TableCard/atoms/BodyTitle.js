import React from "react"
import { IonLabel } from "@ionic/react"

const BodyTitle = ({ allProps }) => {
  const { bodyTitle = "" } = allProps
  return <IonLabel>{bodyTitle}</IonLabel>
}

export default BodyTitle
