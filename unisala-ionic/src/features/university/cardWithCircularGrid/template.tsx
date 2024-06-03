// eslint-disable-next-line no-use-before-define
import React, { useEffect } from "react"
import { IonCard } from "@ionic/react"
import { RowSection } from "./molecules/rowSection"
import { CardHeader } from "../../../components/defaults"
 export const Template = ({ allProps }) => {
  const { testScores, width, setWidth, isSideBar } = allProps


  return (
    !isSideBar?.testScoreEmpty && (
      <IonCard
        style={{
          margin: "15px 0px 0px 0px"
        }}
        className="ion-margin-top"
      >
        <CardHeader header={"Test Score"} />
        {Object.keys(testScores).map((item, index) => {
          if (["act", "sat"].includes(item) && testScores[item]) {
            return (
              <RowSection
                allProps={allProps}
                testScore={testScores[item]}
                key={index}
                type={item}
              />
            )
          }
          return ""
        })}
      </IonCard>
    )
  )
}
