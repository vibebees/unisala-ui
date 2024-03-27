import React from "react"
import { IonCard, IonGrid } from "@ionic/react"
import SingleCard from "../molecules/SingleCard"
import { CardHeader } from "component/Reusable/cardHeader"
import Typography from "component/ui/Typography"

const RectangularCard = ({ allProps }) => {
  const { data, year } = allProps

  return (
    <IonCard
      style={{
        margin: "10px 0px 0px 0px"
      }}
      className="flex flex-col"
    >
      <CardHeader header="Financial Aid Information" />

      <IonGrid className="ion-padding w-full shadow-none">
        <div className="bg-white h-full p-4 rounded-lg ">
          <Typography variant="h3" className="font-medium text-base">
            Financial Aid Information for {year}
          </Typography>
          <h2 className="text-xl font-medium mb-4 pl-2"></h2>
          <IonGrid className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SingleCard
              allProps={{
                title: "Average Amount of Aid Received",
                value: data?.averageAmountAid
              }}
            />
            <SingleCard
              allProps={{
                title: "Total Number of Students in Fall",
                value: data?.numberOfStudentInThatFall
              }}
            />
            <SingleCard
              allProps={{
                title: "Percent of All Undergraduates in Fall",
                value: data?.percentOfAllUndergraduatesInThatFall + "%"
              }}
            />
            <SingleCard
              allProps={{
                title: "Total Number of Undergraduates in Fall",
                value: data?.totalNumberOfUndergraduatesInThatFall
              }}
            />
            <SingleCard
              allProps={{
                title: "In-State Students",
                value: data?.inState.numberOfStudents,
                percentage: data?.inState.percentOfStudents
              }}
            />
            <SingleCard
              allProps={{
                title: "Out-of-State Students",
                value: data?.outOfState.numberOfStudents,
                percentage: data?.outOfState.percentOfStudents
              }}
            />
            <SingleCard
              allProps={{
                title: "Undergraduates Living off Campus",
                value: data?.undergraudate.studentLivingOffCampusNotWithFamily
              }}
            />
            <SingleCard
              allProps={{
                title: "Undergraduates Living off Campus with Family",
                value: data?.undergraudate.studentLivingOffCampusWithFamily
              }}
            />
            <SingleCard
              allProps={{
                title: "Undergraduates Living on Campus",
                value: data?.undergraudate.studentLivingOnCampus
              }}
            />
          </IonGrid>
        </div>
      </IonGrid>
    </IonCard>
  )
}

export default RectangularCard
