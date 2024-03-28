import React from "react"
import CardBody from "component/RectangularCardGrid/atoms/CardBody"
import CardTitle from "component/RectangularCardGrid/atoms/CardTitle"
import { IonCard, IonGrid, IonRow } from "@ionic/react"

const SingleCard = ({ allProps }) => {
  const { title, value, percentage } = allProps
  if (!title || !value) return null
  if (value.toString() === "-1") return null
  return (
    <IonCard className="bg-neutral-200 m-0    bg-opacity-50 hover:scale-105 transition-transform duration-700 ease-linear rounded-lg py-2 px-3">
      <CardTitle title={title} />
      <CardBody value={value} percentage={percentage} />
    </IonCard>
  )
}

export default SingleCard
