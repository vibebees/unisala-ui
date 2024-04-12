import { IonGrid } from "@ionic/react"
 import HistoryHeader from "../history/atoms/HistoryHeader"
import {SqueezeBox} from "../squeezeBox"

export const History = () => {
  return (
    <IonGrid style={{ maxWidth: "900px", margin: "auto" }}>
      <HistoryHeader />
      <SqueezeBox />
    </IonGrid>
  )
}
