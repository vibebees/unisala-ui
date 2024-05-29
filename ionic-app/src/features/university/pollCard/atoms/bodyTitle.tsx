import { IonText } from "@ionic/react"
import { Typography } from "../../../../components/defaults"

export const BodyTitle = ({ allProps }) => {
  const { bodyDetail = "What one word or phrase best describes your school?" } =
    allProps
  return (
    <Typography color="dark" variant="h3">
      {bodyDetail}
    </Typography>
  )
}
