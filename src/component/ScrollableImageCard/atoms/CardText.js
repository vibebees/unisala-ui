import { Typography } from "component/ui"
import React from "react"

const CardText = ({ name }) => {
  return (
    <Typography
      variant="h5"
      className=" text-xs  leading-5  text-center py-2 text-neutral-800 overflow-hidden break-words"
    >
      {name}
    </Typography>
  )
}

export default CardText
