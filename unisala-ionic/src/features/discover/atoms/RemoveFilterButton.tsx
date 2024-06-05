import React from "react"
import { IonButton } from "@ionic/react"

const RemoveFilterButton = () => {
  const removeFilter = () => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.delete("q")
    searchParams.delete("tab")
    window.location.search = searchParams.toString()
  }

  return (
    <IonButton
      className=" relative right-0 text-right"
      size="small"
      fill="outline"
      onClick={removeFilter}
    >
      Remove Filter
    </IonButton>
  )
}

export default RemoveFilterButton
