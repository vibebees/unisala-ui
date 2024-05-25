import React from "react";
import { SpaceRole } from "../../../utils/lib/SpaceRoles";
import RequestToJoin from "./organism/RequestToJoin";
import SendInvitationAll from "./organism/SendInvitationAll";
import SingleInvitation from "./organism/SingleInvitation";
import { Card } from "../../../components/defaults";
import { useOrgContext } from "..";

const Index = () => {
  const { isJoined, _id, role } = useOrgContext();
  return (
    <Card className="h-fit shadow-none mt-1 ion-no-margin w-full">
      {(role === SpaceRole.ADMIN || role === SpaceRole.MEMBER) && (
        <SendInvitationAll />
      )}
      {isJoined ? (
        <SingleInvitation orgId={_id} role={role} isJoined={isJoined} />
      ) : (
        <RequestToJoin />
      )}
    </Card>
  );
};

export default Index;
