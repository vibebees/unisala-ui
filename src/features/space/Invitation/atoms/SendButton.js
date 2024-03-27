import React from "react"
import { IonButton, IonSpinner } from "@ionic/react"
import clsx from "clsx"

const SendButton = ({ loading = false, label = "Submit", onclick }) => {
  return (
    <IonButton
      onClick={onclick}
      color="dark"
      className={clsx(
        "mt-6 h-10 text-base capitalize w-full",
        loading && "opacity-50 pointer-events-none cursor-not-allowed"
      )}
    >
      {loading ? <IonSpinner></IonSpinner> : label}
    </IonButton>
  )
}

export default SendButton
