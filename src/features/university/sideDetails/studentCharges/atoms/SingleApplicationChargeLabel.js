import React from "react"
import Typography from "component/ui/Typography"
const SingleApplicationChargeLabel = ({ label, data }) => {
  return <>{data !== -1 && <Typography variant="h3">{label}</Typography>}</>
}

export default SingleApplicationChargeLabel
