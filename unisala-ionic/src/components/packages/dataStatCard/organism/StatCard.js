import React from "react"
import SingleStatCard from "../molecules/SingleStatCard"
import { IonCardContent } from "@ionic/react"
import {Typography} from "../../../defaults"

const StatCard = ({ allProps }) => {
  const { data, label, containerStyle, CardStyle } = allProps
  return (
    <IonCardContent class="w-full max-md:p-0  max-md:py-2">
      <Typography variant="h2" className="pl-6 text-neutral-600 font-semibold">
        {label}
      </Typography>
      <SingleStatCard allProps={allProps} />
    </IonCardContent>
  )
}

export default StatCard
