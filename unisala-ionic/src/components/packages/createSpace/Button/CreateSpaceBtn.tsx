import { IonButton, IonIcon } from "@ionic/react"
import { addOutline } from "ionicons/icons"
import React from "react"
import { useLocation, useParams } from "react-router-dom" // Import useParams from React Router

const CreateSpaceBtn = ({ setIsOpen }) => {
  const location = useLocation()
  const isOrgRoute = location.pathname.startsWith("/org")
  return (
    <IonButton
      className=""
      expand="block"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <IonIcon icon={addOutline} slot="start" />
      Create a {isOrgRoute ? "Org" : "Space"}
    </IonButton>
  )
}

export default CreateSpaceBtn
