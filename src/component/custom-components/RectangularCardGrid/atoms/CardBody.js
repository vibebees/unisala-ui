import React from "react"
import { IonText } from "@ionic/react"
import useIsData from "hooks/useIsData"
import Typography from "component/defaults/Typography"

const CardBody = ({ value, percentage }) => {
  return (
    <Typography
      variant="h3"
      className="font-medium text-neutral-900 text-base text-center py-1"
    >
      {value.toString() === "-1" ? "N/A" : useIsData(value)}{" "}
      {percentage && (
        <span className="font-normal text-base ml-1">({percentage}%)</span>
      )}
    </Typography>
  )
}

export default CardBody
