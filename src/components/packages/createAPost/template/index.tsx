import React, { useState } from "react";
import { Card } from "../../../defaults/index";
import { usePathName } from "@hooks/usePathname";
import { PostCardForClick } from "../organisim/PostCardForClick";
import { PostModalOnClick } from "../organisim/PostModalOnClick";
import CreateAPostModal from "../molecules/modal";
import { getMetaData } from "@datasource/graphql/user";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { useQuery } from "@apollo/client";

const CreateAPostCard = () => {
  const [meta, setMeta] = useState({});

  const { data, loading } = useQuery(getMetaData, {
    context: { server: USER_SERVICE_GQL },
  });

  if (data) {
    setMeta(data.getMetaData);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <Card
      className="BorderCard ion-no-margin ion-no-padding"
      style={{ marginBottom: "5px" }}
      onClick={() => {}}
    >
      <CreateAPostModal
        ModalData={<PostModalOnClick metaData={meta} />}
        ModalButton={<PostCardForClick />}
        header="Create a Post"
      />
    </Card>
  );
};

export default CreateAPostCard;
