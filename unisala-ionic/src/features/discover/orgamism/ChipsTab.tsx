import React from "react"
import Chip from "../atoms/Chip"
import { IonRow, IonButton, IonCol } from "@ionic/react"
import { URLgetter } from "../../../utils/lib/URLupdate"
import { useHistory } from "react-router-dom"

export const ChipsTab = () => {
  const history = useHistory()
  const getURLdata = () => {
    const dataObj = {}

    const degree = URLgetter("deg")
    const tutionLevel = URLgetter("loc")
    const accomodation = URLgetter("acc")
    const family = URLgetter("fam")
    const sat = URLgetter("sat")
    const act = URLgetter("act")
    const applicationFee = URLgetter("af")
    const CostOfAttendance = URLgetter("coa")
    const tuitionFee = URLgetter("tf")
    const state = URLgetter("state")
    const major = URLgetter("major")

    if (degree) {
      if (degree === "u") {
        dataObj.deg = "Undergraduate"
      } else if (degree === "g") {
        dataObj.deg = "Graduate"
      }
    }

    if (tutionLevel) {
      if (tutionLevel === "O") {
        dataObj.loc = "Out of State"
      } else if (tutionLevel === "I") {
        dataObj.loc = "In State"
      }
    }

    if (accomodation) {
      if (accomodation === "o") {
        dataObj.acc = "On Campus"
      } else if (accomodation === "O") {
        dataObj.acc = "Off Campus"
      }
    }

    if (family) {
      if (family === "W") {
        dataObj.fam = "With roommates"
      } else {
        dataObj.fam = "Without roommates"
      }
    }

    if (sat) {
      dataObj.sat = sat
    }

    if (act) {
      dataObj.act = act
    }

    if (applicationFee) {
      dataObj.af = applicationFee
    }

    if (CostOfAttendance) {
      dataObj.coa = CostOfAttendance
    }

    if (tuitionFee) {
      dataObj.tf = tuitionFee
    }

    if (state) {
      dataObj.state = state
    }

    if (major) {
      dataObj.major = major
    }

    return dataObj
  }

  const data = getURLdata()
  const arr = []

  for (const [key, value] of Object.entries(data)) {
    const newObj = {
      key: key,
      value: value
    }
    arr.push(newObj)
  }
  return (
    <IonRow className="pl-3">
      <IonCol className="w-full">
        {arr.map((item, index) => (
          <Chip item={item} key={index} />
        ))}
      </IonCol>
      {arr.length > 0 && (
        <IonCol size="auto">
          <IonButton
            fill="clear"
            onClick={() => {
              history.push("/search?tab=uni")
            }}
            className="float-right text-xs capitalize px-2 rounded-full ion-no-padding ion-no-margin"
          >
            Clear filters
          </IonButton>
        </IonCol>
      )}
    </IonRow>
  )
}
