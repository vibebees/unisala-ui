import { IonGrid } from "@ionic/react"
import { SqueezeBox } from "component/squeezeBox"
import HistoryHeader from "../history/atoms/HistoryHeader"

export const History = () => {
  return (
    <IonGrid style={{ maxWidth: "900px", margin: "auto" }}>
      <HistoryHeader />
      <SqueezeBox />
    </IonGrid>
  )
}
