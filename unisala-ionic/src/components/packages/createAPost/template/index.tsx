/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Card, Spinner } from "../../../defaults/index";
import { usePathName } from "@hooks/usePathname";
import { PostCardForClick } from "../organisim/PostCardForClick";
import { PostModalOnClick } from "../organisim/PostModalOnClick";
import CreateAPostModal from "../molecules/modal";
import { GET_METADATA_TAGS } from "@datasource/graphql/user";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { useQuery } from "@apollo/client";
import MetatagFetchError from "../atoms/MetatagFetchError";
import { CreateAPostProvider } from "../createAPostContext";

const CreateAPostCard = ({allProps}: { allProps: any }) => {
  const [meta, setMeta] = useState({});
  const pathname = usePathName(0);
  const {tags = [], unitId} = allProps || {};

  const { data, loading, error } = useQuery(GET_METADATA_TAGS, {
    context: { server: USER_SERVICE_GQL },
  });

  useEffect(() => {
    if (!loading && data) {
      const addApost = data.getMetadataTags?.data?.[pathname]?.addAPost;
      setMeta(addApost ?? {});
    }
  }, [data, pathname]);

  return (
    <Card
      className="BorderCard ion-no-margin ion-no-padding"
      style={{ marginBottom: "5px", marginTop: "5px" }}
      onClick={() => {}}
    >
      <CreateAPostProvider>
        <CreateAPostModal
          ModalData={
            <>
              {error && <MetatagFetchError />}

              {!error && !loading && <PostModalOnClick metaData={meta}  tags={tags} unitId={unitId}/>}
              {loading && <Loader />}
            </>
          }
          ModalButton={<PostCardForClick />}
        />
      </CreateAPostProvider>
    </Card>
  );
};

export default CreateAPostCard;

const Loader = () => {
  return (
    <div className=" mt-28 w-full grid place-content-center">
      <Spinner></Spinner>
    </div>
  );
};
