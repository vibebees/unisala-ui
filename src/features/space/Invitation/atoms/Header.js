import React from "react"
import { IonText, IonCardSubtitle } from "@ionic/react"

const Header = ({ header, subHeader }) => {
  return (
    <IonText>
      <h1 className="text-xl font-semibold text-neutral-800">{header}</h1>
      <IonCardSubtitle className="font-normal mt-1 text-sm text-neutral-600">
        {subHeader}
      </IonCardSubtitle>
    </IonText>
  )
}

export default Header
