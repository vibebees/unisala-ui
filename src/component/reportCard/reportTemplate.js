// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
import { IonCard, IonGrid } from "@ionic/react"

import "./Report.css"
import { handleResize } from "utils/screen"

import { ReportAverage } from "./organisms/reportAverage"
import { ReportBody } from "./organisms/reportBody"
import {CardHeader} from "component/Reusable/cardHeader"

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

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  return isSideBar?.reportEmpty ? null : (
    <IonCard
      style={{
        margin: "15px 0px 0px 0px"
      }}
      className="ion-margin-top"
    >
      <CardHeader header={"Report"} />
      <ReportAverage allProps={allProps} />
      <IonGrid
        style={{
          margin: 0,
          padding: "0px 0px 30px 0px",
          height: more || width >= 768 ? "auto" : 225,
          overflow: "hidden",
          position: "relative"
        }}
      >
        {/* {width < 768 && (
                    <div
                        onClick={() => {
                            setMore(!more)
                        }}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: "white",
                            zIndex: 1,
                            textAlign: "center",
                            padding: "10px",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 10,
                            borderTop: "1px solid #C4C4C4"
                        }}
                        className="short"
                    >
                        {more ? "Show Less" : "Show More"}
                        <IonIcon icon={more ? arrowUp : arrowDown} />
                    </div>
                )} */}

        <ReportBody allProps={allProps} />
      </IonGrid>
    </IonCard>
  )
}
