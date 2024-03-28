import React from "react"
import { IonRow, IonCol, IonButton, IonText } from "@ionic/react"
import AddHistory from "component/timeline/atoms/AddHistory"
import clsx from "clsx"
const HistoryHeader = () => {
  const [showAddHistory, setshowAddHistory] = React.useState(false)
  return (
    <IonRow className={clsx("flex-col", showAddHistory ? "mb-0" : "mb-5")}>
      <IonRow className="ion-no-margin mt-5 ion-no-padding items-center justify-between">
        <IonCol
          size="auto"
          className="w-full  h-full ion-no-margin ion-no-padding  px-0"
        >
          <IonText className="text-neutral-950">
            <h2 className="text-center text-neutral-900 relative font-bold pl-1 text-lg">
              History of NSAS
            </h2>
          </IonText>
        </IonCol>
        <IonCol size="auto" className="ion-no-padding ion-no-margin">
          <IonButton
            color={"primary"}
            fill="clear"
            className="capitalize bg-blue-100  rounded-md"
            onClick={() => setshowAddHistory(!showAddHistory)}
          >
            {showAddHistory ? "Cancel" : "Add History"}
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow
        className={clsx(
          "w-full  ion-no-margin ion-no-padding overflow-hidden duration-200 transition-all ease-linear",
          showAddHistory ? "h-24" : "h-0"
        )}
      >
        <IonCol className="w-full ion-no-margin ion-no-padding border-none">
          <AddHistory />
        </IonCol>
      </IonRow>
    </IonRow>
  )
}

export default HistoryHeader
