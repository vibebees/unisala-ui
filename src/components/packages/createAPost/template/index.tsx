import axios from "axios"
import { Card } from "../../../defaults/index"

import { usePathName } from "../../../../hooks/usePathname"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import { userServer } from "../../../../datasource/servers/endpoints"
import { PostCardForClick } from "../organisim/PostCardForClick"
import { PostModalOnClick } from "../organisim/PostModalOnClick"
import { getCache, setCache } from "../../../../utils/cache"
import { CreateAPostModal } from "../molecules/modal"
const CreateAPostCard = ({ allProps }) => {
  const { user } = useSelector((state) => state.userProfile)
  const { setCreateAPostPopUp } = allProps
  const [ meta, setMeta ] = useState({})
  const history = useHistory()
  const params = new URLSearchParams(window.location.href.search)
  const pathname = usePathName(0) || "home"

  useEffect(() => {
    const cacheKey = `metadata-${pathname}`
    const cachedMeta = getCache(cacheKey) || false

    const fn = async () => {
      if (cachedMeta) {
        setMeta(cachedMeta)
      } else {
        try {
          const createAPostMetaData = await axios.get(
            userServer + "/getMetadataTags",
            {
              headers: {
                authorization: getCache("accessToken")
              }
            }
          )

          const metaData = createAPostMetaData.data?.data || []
          const getCurrentPageMetaData = metaData[ pathname ] || {}
          const { addAPost } = getCurrentPageMetaData || {}

          setMeta(addAPost)
          setCache(cacheKey, JSON.stringify(addAPost))
        } catch (error) {
          console.error("Failed to fetch metadata", error)
        }
      }
    }

    fn()
  }, [ pathname ])

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
  )
}

export default CreateAPostCard
