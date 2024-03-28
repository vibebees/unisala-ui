import { IonCard } from "@ionic/react"
import { CoverImg } from "./CoverImg"
import "./UniProfile.css"
import ProDetails from "./ProDetails"

export const UniProfile = (props) => {
  return (
    <IonCard style={{ margin: 0 }} className="">
      <CoverImg {...props} />
      <ProDetails />
    </IonCard>
  )
}
