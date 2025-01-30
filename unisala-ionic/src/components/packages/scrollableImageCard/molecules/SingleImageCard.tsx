import React from "react"
import { Card } from "../../../defaults/index"
import CardImage from "../atoms/CardImage"
import CardText from "../atoms/CardText"

const SingleImageCard = ({ allProps }) => {
  const {
    name,
    pictures: image,
    defaultImage = "https://cdn.vox-cdn.com/thumbor/l5-CNuyDLr8IR8dWTW_7wqnT_bc=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084622/5f1b1bd4b8800.image.jpg"
  } = allProps

  return (
    <Card className="ion-no-margin mx-2 h-full mb ">
      <CardImage image={image || defaultImage} />
      <CardText name={name} />
    </Card>
  )
}

export default SingleImageCard
