import React, { useEffect, useState } from "react"
import { IonRow, IonText, IonIcon, IonLabel, IonCol } from "@ionic/react"
import { schoolOutline } from "ionicons/icons"
import { URLgetter } from "utils/lib/URLupdate"
import { useHistory } from "react-router"

const Offerings = ({ allProps }) => {
  const { graduateOffering, undergraduateOffering } = allProps
  const history = useHistory()
  const [selectedDeg, setSelectedDeg] = useState(null)

  useEffect(() => {
    const data = URLgetter("deg")
    if (data) {
      if (data === "u") {
        setSelectedDeg("undergraduate")
      }
      if (data === "g") {
        setSelectedDeg("graduate")
      }
    } else {
      setSelectedDeg(null)
    }
  })

  return (
    <IonRow className="ion-no-padding pl-1 mt-2 h-fit ">
      <IonRow className="ion-no-padding justify-start h-fit">
        <IonIcon
          className="ion-icon text-primar text-lg"
          icon={schoolOutline}
        />
        {((graduateOffering && selectedDeg === "graduate") ||
          selectedDeg === null) && (
          <IonCol size="auto" className="ion-no-padding ml-2 w-fit p-0 h-fit">
            <IonLabel className="ion-padding-start p-0 font-semibold  text-red-500">
              {graduateOffering.substring(0, 30)}
            </IonLabel>
          </IonCol>
        )}

        {((undergraduateOffering && selectedDeg === "undergraduate") ||
          selectedDeg === null) && (
          <IonCol size="auto" className="ion-no-padding h-fit ">
            <IonLabel className="ion-padding-start  font-bold text-blue-500">
              {undergraduateOffering.substring(0, 35)} 📚
            </IonLabel>
          </IonCol>
        )}
      </IonRow>
    </IonRow>
  )
}

export default Offerings
