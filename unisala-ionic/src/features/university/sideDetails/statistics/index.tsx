import React from "react"
import Chart from "../../barChart/atoms/Chart"
import { useSelector } from "react-redux"
import statistics from "../statistics/statistics.css"
import CircularCardTemplate from "../../circularCardImage/template/CircularCardTemplate"
import { IonCard, IonText } from "@ionic/react"
import { CardHeader } from "../../../../components/defaults"

const index = () => {
  const { uniData } = useSelector((store) => store?.university)
  const studentStats = uniData.studentsStats
  const graduationRate = uniData?.graduationRate

  const chatLabelsOne = {
    americanIndianOrAlaskaNative: "Native American",
    asian: "Asian",
    blackOrAfricanAmerican: "Black",
    hispanic: "Hispanic",
    nonresidentAlien: "International",
    nativeHawaiianOrOtherPacificIslander: "Hawaiian/Pacific Islander",
    white: "White"
  }

  const chatLabelsTwo = {
    americanIndianOrAlaskaNative: "Native American",
    asian: "Asian",
    blackOrAfricanAmerican: "Black",
    hispanic: "Hispanic",
    men: "Men",
    nonResidentAlien: "International",
    raceEthnicityUnknown: "Unknown",
    totalCohort: "Total Cohort",
    twoOrMoreRaces: "Multi-Racial",
    white: "White",
    women: "Women"
  }

  return (
    <IonCard
      style={{
        margin: "10px 0px 0px 0px"
      }}
      className="flex flex-col"
    >
      <CardHeader header={"Statistics"} />
      <IonCard>
        <CircularCardTemplate
          value={studentStats}
          header={"Enrolled Students"}
        />
      </IonCard>
      <IonCard className="px-7 shadow-none py-7">
        <Chart
          allProps={{
            chatLabels: chatLabelsOne,
            data: studentStats?.enrollmentByRace,
            header: "Enrollment by Race",
            YAxisLabel: "Enrollment"
          }}
        />
      </IonCard>
      <hr />
      <IonCard className="px-7 shadow-none py-7">
        <Chart
          allProps={{
            chatLabels: chatLabelsTwo,
            data: graduationRate,
            header: "Graduation Rates by Category",
            maxvalue: 100,
            YAxisLabel: "Graduation Rate (%)"
          }}
        />
      </IonCard>
    </IonCard>
  )
}

export default index
