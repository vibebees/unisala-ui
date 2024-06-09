import React from "react"
import { Icon } from "../../../defaults"
import { ellipsisVerticalCircleOutline } from "ionicons/icons"

const SeeMoreButton = () => {
  return (
    <Icon
      style={{
        fontSize: "22px",
        alignSelf: "center"
      }}
      className="ion-icon text-neutral-500"
      icon={ellipsisVerticalCircleOutline}
    />
  )
}

export default SeeMoreButton
