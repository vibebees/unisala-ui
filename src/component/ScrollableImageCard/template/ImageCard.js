import React from "react"
import { IonCard } from "@ionic/react"
 import ScrollableCard from "../organism/ScrollableCard"
import {CardHeader} from "component/Reusable/cardHeader"

const ImageCard = ({ allProps }) => {
  const { data, header } = allProps

  if (data.recommendedUniversity === null && data.similarSchools === null) {
    return null
  }

  return (
    <IonCard
      style={{
        margin: "15px 0px 0px 0px"
      }}
      className="ion-margin-top"
    >
      <CardHeader header={header} />
      <ScrollableCard
        allProps={{
          title: "Similar Schools",
          data: data?.similarSchools,
          className: "similarschoolss"
        }}
      />
      <ScrollableCard
        allProps={{
          title: "Recommended University",
          data: data?.recommendedUniversity?.map((item) => ({ name: item })),
          className: "similarUniversity"
        }}
      />
    </IonCard>
  )
}

export default ImageCard
