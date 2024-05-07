import React from "react"
import { Spinner } from "@components/defaults"
 import {Button} from "../../../../components/defaults"
import {cn} from "../../../../utils"

const HistoryButton = ({
  loading = false,
  label = "Save",
  onClick,
  className
}) => {
  return (
    <Button
      color={"primary"}
      onClick={onClick}
      className={cn(
        " ion-no-margin  capitalize ion-no-padding  shadow-none",
        className
      )}
    >
      {loading ? <Spinner name="lines" /> : label}
    </Button>
  )
}

export default HistoryButton
