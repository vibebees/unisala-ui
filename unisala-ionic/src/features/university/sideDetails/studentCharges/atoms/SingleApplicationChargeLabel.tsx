import React from "react"
import { Typography } from "../../../../../components/defaults"
const SingleApplicationChargeLabel = ({ label, data }) => {
  return <>{data !== -1 && <Typography variant="h3">{label}</Typography>}</>
}

export default SingleApplicationChargeLabel
