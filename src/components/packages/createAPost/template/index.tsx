import axios from "axios";
import { Card } from "../../../defaults/index";

import { usePathName } from "../../../../hooks/usePathname";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { userServer } from "../../../../datasource/servers/endpoints";
import { PostCardForClick } from "../organisim/PostCardForClick";
import { PostModalOnClick } from "../organisim/PostModalOnClick";
import { getCache, setCache } from "../../../../utils/cache";
import { CreateAPostModal } from "../molecules/modal";
const CreateAPostCard = ({ allProps }) => {
  const { user } = useSelector((state) => state.userProfile);
  const { setCreateAPostPopUp } = allProps;
  const [meta, setMeta] = useState({});
  const history = useHistory();
  const params = new URLSearchParams(window.location.href.search);
  const pathname = usePathName(0) === "feed" ? "home" : usePathName(0);
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
    <Card
      style={{ marginBottom: "5px" }}
      onClick={() => {
        // params.append("create", "y")
        // if (allProps.unitId) {
        //   params.append("unitId", allProps.unitId)
        // }
        // history.push({
        //   search: params.toString()
        // })
        // setCreateAPostPopUp(true)
        // console.log("clicked")
      }}
    >
      <CreateAPostModal
        ModalData={<PostModalOnClick allProps={allProps} metaData={meta} />}
        ModalButton={<PostCardForClick allProps={{ ...allProps, user }} />}
        header="Create a Post"
      />
    </Card>
  );
};

export default CreateAPostCard;
