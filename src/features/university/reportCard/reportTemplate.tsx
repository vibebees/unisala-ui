// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
import { IonCard, IonGrid } from "@ionic/react"

import "./Report.css"

import { ReportAverage } from "./organisms/reportAverage"
import { ReportBody } from "./organisms/reportBody"
import { CardHeader } from "../../../components/defaults"

export const ReportTemplate = ({ allProps }) => {
  const { width, more, report, setRecords, isSideBar } = allProps

  useEffect(() => {
    setRecords([
      { title: "Academics", report: report?.academics },
      { title: "Diversity", report: report?.diversity },
      { title: "Value", report: report?.value },
      { title: "Athletics", report: report?.atheltics },
      { title: "Party Scene", report: report?.partyScene },
      { title: "Professors", report: report?.professors },
      { title: "Location", report: report?.location },
      { title: "Dorms", report: report?.dorms },
      { title: "Campus Food", report: report?.campusFood },
      { title: "Student Life", report: report?.studentLife },
      { title: "Safety", report: report?.safety },
      { title: "Professors", report: report?.professors }
    ])
  }, [report])



  return isSideBar?.reportEmpty ? null : (
    <IonCard
      style={{
        margin: "15px 0px 0px 0px"
      }}
      className="ion-margin-top"
    >
      <CardHeader header={"Report"} />
      <ReportAverage allProps={allProps} />
    </IonCard>
  )
}
