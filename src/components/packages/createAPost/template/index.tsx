import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../../../defaults/index";
import { usePathName } from "@hooks/usePathname";
import { userServer } from "@datasource/servers/endpoints";
import { PostCardForClick } from "../organisim/PostCardForClick";
import { PostModalOnClick } from "../organisim/PostModalOnClick";
import { getCache, setCache } from "../../../../utils/cache";
import CreateAPostModal from "../molecules/modal";
const CreateAPostCard = () => {
  const [meta, setMeta] = useState({});
  const pathname = usePathName(0) === "feed" ? "home" : "feed";
  useEffect(() => {
    const cacheKey = "metadata-all";
    const cachedMeta = getCache(cacheKey) || false;
    const fn = async () => {
      if (cachedMeta) {
        setMeta(cachedMeta[pathname]["addAPost"]); // Use the pathname to select the right metadata
      } else {
        try {
          const response = await axios.get(`${userServer}/getMetadataTags`, {
            headers: { authorization: getCache("accessToken") },
          });
          const allMetaData = response.data?.data || {};
          setCache(cacheKey, allMetaData); // Cache all metadata once
          setMeta(allMetaData[pathname]["addAPost"]); // Use the pathname to select the right metadata
        } catch (error) {
          console.error("Failed to fetch metadata", error);
        }
      }
    };

    fn();
  }, [pathname]);

  return (
    <Card style={{ marginBottom: "5px" }} onClick={() => {}}>
      <CreateAPostModal
        ModalData={<PostModalOnClick metaData={meta} />}
        ModalButton={<PostCardForClick />}
        header="Create a Post"
      />
    </Card>
  );
};

export default CreateAPostCard;
