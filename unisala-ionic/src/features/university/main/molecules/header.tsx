import React from "react"
import { IonCard } from "@ionic/react"
 import {CoverImg} from "../atoms/cover.image"
import {BioDetails} from "../atoms/bio.details"

export const UniversityHeader = ({allProps}) => {
  return (
    <IonCard style={{ margin: 0 }}>
      <CoverImg allProps = {allProps} />
      <BioDetails allProps={ allProps} />
    </IonCard>
  )
}
