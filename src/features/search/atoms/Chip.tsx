import { IonChip, IonIcon, IonLabel } from "@ionic/react"
import { closeOutline } from "ionicons/icons"
import React from "react"
import { useHistory } from "react-router"
import { URLdelete } from "../../../utils/lib/URLupdate"

const Chip = ({ item }) => {
  const history = useHistory()
  return (
    <IonChip className="ion-no-padding h-fit py-1 px-2 rounded-md">
      <IonLabel className="text-[12px] leading-none ion-no-padding text-black font-medium">
        {item.value}
      </IonLabel>
      <IonIcon
        onClick={() => {
          const data = URLdelete(item.key)
          history.push({ search: data })
        }}
        icon={closeOutline}
        className="text-sm"
      />
    </IonChip>
  )
}

export default Chip
