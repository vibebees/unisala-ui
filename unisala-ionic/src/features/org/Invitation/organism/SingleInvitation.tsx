import { IonInput, useIonToast } from "@ionic/react";
import NotJoinedWrapper from "../../../org/NotJoinedWrapper";
import React from "react";
import { SpaceRole } from "../../../../utils/lib/SpaceRoles";
import Header from "../atoms/Header";
import SendButton from "../atoms/SendButton";
import { handleSendInvitation } from "../utility";
import InvitationTypesCheckbox from "./InvitationTypesCheckbox";
import { Card } from "../../../../components/defaults";

const SingleInvitation = ({ orgId, role, isJoined }) => {
  const [email, setEmail] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [invitationType, setInvitationType] = React.useState("");
  const [present, dismiss] = useIonToast();
  const [loading, setLoading] = React.useState(false);

  return (
    <div>
      <Card className="ion-no-margin ion-no-padding shadow-none px-4 py-6">
        <Header
          header={"Send Invitation by Email"}
          subHeader={
            "Enter the email address of the person you want to invite."
          }
        />
        <br />
        <IonInput
          type="email"
          autocomplete="additional-name"
          className="border-2 border-neutral-300 rounded-lg !px-2 focus-within:border-neutral-700 duration-300"
          placeholder="Enter email address"
          value={email}
          onIonChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <Header
          header={"Invite user position"}
          subHeader={"Enter the user position title"}
        />
        <br />
        <IonInput
          type="text"
          autocomplete="additional-name"
          className="border-2 border-neutral-300 rounded-lg !px-2 focus-within:border-neutral-700 duration-300"
          placeholder="Enter user position"
          value={title}
          onIonChange={(e) => setTitle(e.target.value)}
        />
        <InvitationTypesCheckbox
          allProps={{
            invitationType,
            setInvitationType,
            admin: role === SpaceRole.ADMIN || role === SpaceRole.MEMBER,
          }}
        />
        <NotJoinedWrapper
          isJoined={isJoined}
          message="Please Join the Organization to send Invitation to others"
        >
          <SendButton
            loading={loading}
            onclick={() =>
              handleSendInvitation({
                email,
                orgId,
                invitationType,
                title,
                setLoading,
                present,
                dismiss,
                setEmail,
              })
            }
            label="Send Invitation"
          />
        </NotJoinedWrapper>
      </Card>
    </div>
  );
};

export default SingleInvitation;
