import {IonCard, IonInput, useIonToast} from "@ionic/react"
import {handleSendInvitation} from "../../../org/Invitation/utility"
import React from "react"
import Header from "../atoms/Header"
import SendButton from "../atoms/SendButton"
import InvitationTypesCheckbox from "./InvitationTypesCheckbox"

const SingleInvitation = ({ spaceId }) => {
  const [email, setEmail] = React.useState("")
  const [invitationType, setInvitationType] = React.useState("")
  const [present, dismiss] = useIonToast()
  const [loading, setLoading] = React.useState(false)


  return (
    <div>
      <IonCard className="ion-no-margin ion-no-padding shadow-none px-4 py-6">
        <Header
          header={"Send Invitation"}
          subHeader={
            "Enter the email address of the person you want to invite."
          }
        />
        <br />
        <IonInput
          type="email"
          autocomplete="additional-name"
          className="border-2 border-neutral-300 rounded-lg p-2 focus-within:border-neutral-700 duration-300"
          placeholder="Enter email address"
          value={email}
          onIonChange={(e) => setEmail(e.target.value)}
        />
        <InvitationTypesCheckbox
          allProps={{
            invitationType,
            setInvitationType,
            admin: false
          }}
        />
        <SendButton
          loading={loading}
          onclick={() => handleSendInvitation({ email, spaceId, invitationType, setLoading, present, dismiss, setEmail })}
          label="Send Invitation"
        />
      </IonCard>
    </div>
  )
}

export default SingleInvitation
