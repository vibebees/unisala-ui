import React from "react"
import useIsData from "../../../../hooks/useIsData"
import useCountConverter from "../../../../hooks/useCountConverter"
import { IonCard, IonLabel, IonText } from "@ionic/react"
import {Typography} from "../../../defaults"

const Card = ({ image, value, title }) => {
  return (
    <IonCard
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      className="border max-md:shadow-none  m-0 hover:bg-neutral-50 rounded-md hover:bg-transparent"
    >
      <div className="rounded-rectangle flex flex-col items-center ">
        <img
          alt=""
          src={image}
          style={{
            width: "50px"
          }}
          className="mix-blend-multiply"
        />
        <Typography
          variant="h2"
          className="!text-xl max-md:!text-base leading-normal text-neutral-900"
        >
          {useIsData(value) !== "N/A" && useCountConverter(value) !== "0"
            ? useCountConverter(value) + "+"
            : useIsData(value)}
        </Typography>

        <Typography
          variant="h3"
          className="text-lg max-md:text-base max-sm:text-xs leading-normal text-neutral-500"
        >
          {title}
        </Typography>
      </div>
    </IonCard>
  )
}

export default Card
