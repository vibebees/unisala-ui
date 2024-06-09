import React from "react"
import { IonButton, IonSearchbar } from "@ionic/react"

const Inputbox = ({ value, setTerm, placeholder = "Enter to search" }) => {
  return (
    <div>
      <IonSearchbar
        placeholder={placeholder}
        className="font-medium text-neutral-600 w-full shadow-md rounded-lg"
        value={value}
        onIonInput={(e) => {
          setTerm(e.target.value)
        }}
      />
    </div>
  )
}

export default Inputbox
