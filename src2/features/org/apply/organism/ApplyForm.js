import { IonCard } from "@ionic/react"
import ApplyButton from "../atoms/ApplyButton"
import ApplyHeader from "../atoms/ApplyHeader"
import ApplySubHeader from "../atoms/ApplySubHeader"

const ApplyForm = () => {
  return (
    <IonCard className=" w-full h-full ion-no-margin shadow-none p-3">
      <ApplyHeader />
      <ApplySubHeader />
      <ApplyButton />
    </IonCard>
  )
}

export default ApplyForm

