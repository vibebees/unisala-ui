import React from "react"
import { IonRow, IonText, IonIcon } from "@ionic/react"
import { location } from "ionicons/icons"

const CardLocation = ({ allProps }) => {
  const { address = {} } = allProps
  const { city, stateAbbreviation, streetAddressOrPOBox } = address || {}
  const formattedAddress = `${city}, ${stateAbbreviation}, ${streetAddressOrPOBox}`

  return (
    <IonRow
      className="ion-no-padding gap-1 items-center h-fit mt-2"
      lines="none"
    >
      <IonIcon
        className="ion-icon leading-none mt-0 text-primar text-lg"
        icon={location}
      />
      <IonText className="text-sm leading-none m-0 h-fit ion-no-padding font-semibold text-gray-600">
        {formattedAddress}
      </IonText>
    </IonRow>
  )
}

export default CardLocation
