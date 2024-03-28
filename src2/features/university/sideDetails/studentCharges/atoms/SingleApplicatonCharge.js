import React from "react"
import Typography from "component/defaults/Typography"

const SingleApplicatonCharge = ({ data }) => {
  return (
    <>
      {data !== -1 && (
        <Typography variant="h3">
          : <span className="px-2 " /> $ {""}
          {data}
        </Typography>
      )}
    </>
  )
}

export default SingleApplicatonCharge
