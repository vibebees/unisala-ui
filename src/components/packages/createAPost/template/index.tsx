import React, { useEffect, useState } from "react";
import { Card } from "../../../defaults/index";
import { usePathName } from "@hooks/usePathname";
import { PostCardForClick } from "../organisim/PostCardForClick";
import { PostModalOnClick } from "../organisim/PostModalOnClick";
import CreateAPostModal from "../molecules/modal";
import { GET_METADATA_TAGS } from "@datasource/graphql/user";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { useQuery } from "@apollo/client";

const CreateAPostCard = () => {
  const [meta, setMeta] = useState({
    allProps: {},
  });
  const pathname = usePathName(0);

  // useEffect(() => {
  //   const cacheKey = "metadata-all";
  //   const cachedMeta = getCache(cacheKey) || false;
  //   const fn = async () => {
  //     if (cachedMeta) {
  //       setMeta(cachedMeta[pathname]["addAPost"]); // Use the pathname to select the right metadata
  //     } else {
  //       try {
  //         const response = await axios.get(`${userServer}/getMetadataTags`, {
  //           headers: { authorization: getCache("accessToken") },
  //         });
  //         const allMetaData = response.data?.data || {};
  //         setCache(cacheKey, allMetaData); // Cache all metadata once
  //         console.log('----> actual data to set meta')
  //         console.log(allMetaData[pathname]["addAPost"])
  //         setMeta(allMetaData[pathname]["addAPost"]); // Use the pathname to select the right metadata
  //       } catch (error) {
  //         console.error("Failed to fetch metadata", error);
  //       }
  //     }
  //   };

  //   fn();
  // }, [pathname]);

  const { data, loading, error } = useQuery(GET_METADATA_TAGS, {
    context: { server: USER_SERVICE_GQL },
  });

  useEffect(() => {
    if (!loading && data) {
      const addApost = data.getMetadataTags?.data?.[pathname]?.addAPost;

      console.log("----> actual data to set meta");
      console.log(addApost);

      setMeta(addApost ?? {});
    }
  }, [data, pathname]);

  console.log({ data, loading, error });
  // console.log({data, loading, error})
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
