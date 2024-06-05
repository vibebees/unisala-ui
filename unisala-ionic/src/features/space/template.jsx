import CreateAPostCard from "@components/packages/createAPost/template"
import "./Space.css"
import SpaceHeader from "./SpaceHeader"
import PageNotFound from "../../navigation/PageNotFound"
import {PreLoader} from "@components/packages/preloader"
import InfiniteFeed from "@components/packages/feed/Feed"

export const Spaces = ({data = {}, loading = true}) => {

  const {searchSpaceCategory} = data,
    {data: spaceData} = searchSpaceCategory || {},
    tags =  [spaceData?._id]

  if (loading) {
    return <PreLoader />
  }

  if (!spaceData) {
    return <PageNotFound />
  }

  return (
    <div className="w-full mx-3 overflow-x-hidden">
      <SpaceHeader spaceDetails={spaceData} />
      <CreateAPostCard allProps={{tags}} />
      <InfiniteFeed feedId={spaceData?._id} feedType={"specificSpace"} />
    </div>
  )
}
