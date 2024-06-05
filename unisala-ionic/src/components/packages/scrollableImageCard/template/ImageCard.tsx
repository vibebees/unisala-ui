import React from "react"
 import ScrollableCard from "../organism/ScrollableCard"
import { CardHeader } from "../../reusable/cardHeader"
import { Card } from "../../../defaults"

const ImageCard = ({ allProps }) => {
  const { data, header } = allProps

  if (data.recommendedUniversity === null && data.similarSchools === null) {
    return null
  }

  return (
    <Card
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
    </Card>
  )
}

export default ImageCard
