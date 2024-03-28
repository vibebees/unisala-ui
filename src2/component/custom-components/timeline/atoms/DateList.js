/* eslint-disable no-unreachable */
import { IonButton, IonCol, IonIcon, IonRow, IonText } from "@ionic/react"
import clsx from "clsx"
import { closeCircle, create } from "ionicons/icons"
import { useState } from "react"
import EditHistory from "./EditHistory"

const DateList = ({ date = "", content = "" }) => {
  const [edit, setedit] = useState(false)
  return (
    <IonRow className="border-t h-full py-2 px-4 group ion-no-margin ion-no-padding  border-neutral-400 border-opacity-25 items-center  justify-start flex">
      <IonCol size="3" className="ion-no-padding ion-no-margin">
        <IonText>
          <h5 className="  h-full text-sm opacity-40">{date}</h5>
        </IonText>
      </IonCol>
      <IonCol className="ion-no-padding ion-no-margin  w-full">
        {edit ? (
          <EditHistory text={"Sonja joinedthe team"} />
        ) : (
          <IonText>
            <h3 className="  h-full text-sm opacity-70">{content} </h3>
          </IonText>
        )}
      </IonCol>
      <IonCol
        size="auto"
        className={clsx(
          "ion-no-padding opacity-0 group-hover:opacity-100  ion-no-margin ",
          edit && "opacity-100"
        )}
      >
        <IonButton
          fill="clear"
          color="primary"
          className="text-sm opacity-70 ion-no-margin  "
          size="small"
          onClick={() => setedit(!edit)}
        >
          <IonIcon
            className={clsx("", edit && "text-red-500")}
            icon={edit ? closeCircle : create}
          />
        </IonButton>
      </IonCol>
    </IonRow>
  )
}

export default DateList
