import React from "react"
import { IonCard } from "@ionic/react"
 import StatCard from "../organism/StatCard"
import { CardHeader } from "../../../../components/packages/reusable/cardHeader"

const StatCardTemplateTwo = ({ allProps }) => {
  const { data, bodyTitle = "" } = allProps

  return (
    <IonCard
      style={{
        margin: "10px 0px 0px 0px"
      }}
      className="flex flex-col"
    >
      <CardHeader header={bodyTitle} />

      <StatCard
        allProps={{
          data: [
            {
              title: "Physical Books",
              value: `${data?.physicalBook}`,
              image: "https://cdn-icons-png.flaticon.com/512/7398/7398653.png"
            },
            {
              title: "Physical Media",
              value: `${data?.physicalMedia}`,
              image: "https://cdn-icons-png.flaticon.com/512/7398/7398653.png"
            },
            {
              title: "Online Books",
              value: `${data?.digitalElectronicBook}`,
              image: "https://cdn-icons-png.flaticon.com/512/7398/7398653.png"
            }
          ],
          label: "",
          containerStyle: {
            display: "flex",
            width: "100%",
            border: "none",
            flexWrap: "wrap"
          },
          CardStyle: {
            width: "100% !important",
            border: "none"
          }
        }}
      />
    </IonCard>
  )
}
export default StatCardTemplateTwo
