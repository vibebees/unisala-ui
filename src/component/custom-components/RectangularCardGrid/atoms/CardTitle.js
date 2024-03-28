import React from "react"
import { IonText } from "@ionic/react"
import Typography from "component/defaults/Typography"

const CardTitle = ({ title }) => {
  return (
    <Typography variant="h4" className="font-normal text-center">
      {title}
    </Typography>
  )
}

export default CardTitle
