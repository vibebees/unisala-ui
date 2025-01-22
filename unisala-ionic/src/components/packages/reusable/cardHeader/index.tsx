import React from "react"
import { CardContent, Typography } from "../../../defaults/index"

export const CardHeader = ({ header, child = "" }) => {
  return (
    <div className="font-normal flex items-center bg-neutral-100  border-b border-neutral-300 text-neutral-700 px-2 text-lg py-3">
      <Typography variant="h2" className="px-2">
        {header}
      </Typography>

      <CardContent style={{ display: "flex", padding: "0 12px" }}>
        {child}
      </CardContent>
    </div>
  )
}

