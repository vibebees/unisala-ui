/* eslint-disable complexity */
import React from "react"
import { IonRow, IonText, IonIcon, IonLabel } from "@ionic/react"
import { cashOutline } from "ionicons/icons"
import { URLgetter } from "utils/lib/URLupdate"

const ApplicationCharges = ({
  undergraduateApplicationFee = null,
  undergraduate,
  graduateApplicationFee,
  graduate
}) => {
  let TutitonFee
  let CostOfAttendence
  let ApplicationCharge
  const Level = URLgetter("loc")
  const Accomandation = URLgetter("acc")
  const Staying = URLgetter("fam")
  const degree = URLgetter("deg")

  if (degree === "u") {
    ApplicationCharge = undergraduateApplicationFee
  } else if (degree === "g") {
    // eslint-disable-next-line no-unused-vars
    ApplicationCharge = graduateApplicationFee
  }

  if (Level) {
    if (Level === "I" && degree === "u") {
      TutitonFee = undergraduate?.inState?.tuition
    } else if (Level === "I" && degree === "g") {
      TutitonFee = graduate?.inState?.tuition
    } else if (Level === "O" && degree === "g") {
      // eslint-disable-next-line no-unused-vars
      TutitonFee = graduate?.outOfState?.tuition
    } else if (Level === "O" && degree === "u") {
      TutitonFee = undergraduate?.outOfState?.tuition
    }
  }

  if (Accomandation && Level) {
    if (Accomandation === "o") {
      if (Level === "I") {
        CostOfAttendence = undergraduate?.onCampus?.costOfAttendance?.inState
      } else if (Level === "O") {
        CostOfAttendence = undergraduate?.onCampus?.costOfAttendance?.outOfState
      }
    } else if (Accomandation === "O" && Staying) {
      if (Level === "I" && Staying === "W") {
        CostOfAttendence =
          undergraduate?.offCampusWithFamily?.costOfAttendance?.inState
      } else if (Level === "I" && Staying === "N") {
        CostOfAttendence =
          undergraduate?.offCampusNotWithFamily?.costOfAttendance?.inState
      } else if (Level === "O" && Staying === "N") {
        // eslint-disable-next-line no-unused-vars
        CostOfAttendence =
          undergraduate?.offCampusNotWithFamily?.costOfAttendance?.outOfState
      } else if (Level === "O" && Staying === "W") {
        CostOfAttendence =
          undergraduate?.offCampusWithFamily?.costOfAttendance?.outOfState
      }
    }
  }
  if (!ApplicationCharge && !TutitonFee && !CostOfAttendence) return null

  return (
    <IonRow className="ion-no-padding pl-1 mt-3 ">
      <IonIcon className="ion-icon text-primar text-lg" icon={cashOutline} />
      {(ApplicationCharge || ApplicationCharge === 0) && (
        <IonLabel className="pl-2">
          <IonText className="text-sm font-semibold text-gray-600">
            Application Charges : ${ApplicationCharge}
          </IonText>
        </IonLabel>
      )}
      {TutitonFee && (
        <IonLabel className="pl-2">
          <IonText className="text-sm before:bottom-0 before:top-[9px] before:-left-4 ml-4 before:rounded-full before:absolute relative before:content-[''] before:w-1 before:h-1 before:bg-neutral-400 font-semibold text-gray-600">
            Tution Fee : ${TutitonFee}
          </IonText>
        </IonLabel>
      )}
      {CostOfAttendence && (
        <IonLabel className="pl-2">
          <IonText className="text-sm before:bottom-0 before:top-[9px] before:-left-4 ml-4 before:rounded-full before:absolute relative before:content-[''] before:w-1 before:h-1 before:bg-neutral-400 font-semibold text-gray-600">
            Cost of Attendence : ${CostOfAttendence}
          </IonText>
        </IonLabel>
      )}
    </IonRow>
  )
}

export default ApplicationCharges
