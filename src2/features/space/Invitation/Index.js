import React from "react"
import SendInvitationAll from "./organism/SendInvitationAll"
import { IonCard } from "@ionic/react"
import SingleInvitation from "./organism/SingleInvitation"
import { useSelector } from "react-redux"

const Index = ({ spaceId, spaceAdminId }) => {
  const { user } = useSelector((store) => store?.userProfile)

  return (
    <IonCard className="h-fit shadow-none mt-1 ion-no-margin w-full">
      {user?._id === spaceAdminId && <SendInvitationAll />}
      <SingleInvitation spaceId={spaceId} />
    </IonCard>
  )
}

export default Index
