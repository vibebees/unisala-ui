import React from "react"
import { Grid } from "@components/defaults"
 import HistoryHeader from "../history/atoms/HistoryHeader"
import {SqueezeBox} from "../squeezeBox"

export const History = () => {
  return (
    <Grid style={{ maxWidth: "900px", margin: "auto" }}>
      <HistoryHeader />
      <SqueezeBox />
    </Grid>
  )
}
