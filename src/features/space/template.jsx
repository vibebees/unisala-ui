import {IonCol, IonContent, IonGrid, IonIcon, IonRow} from "@ionic/react"
import {arrowUpOutline} from "ionicons/icons"
import {lazy, useEffect} from "react"
import CreateAPostCard from "@components/packages/createAPost/template"
import "./Space.css"
import SpaceHeader from "./SpaceHeader"
import UnisalaIntro from "./UnisalaIntro"
import PageNotFound from "../../navigation/PageNotFound"
import {PreLoader} from "@components/packages/preloader"
import InfiniteFeed from "@components/packages/feed/Feed"

export const Spaces = ({data = {}, loading = true}) => {

  const {searchSpaceCategory} = data,
    {data: spaceData} = searchSpaceCategory || {},
    tags =  [spaceData?._id]

  // const {spaceData} = searchSpaceCategory || {}
  // const {spaceId} = spaceData || {}
  // const tags = []
  // // condition because we do not want to send null datas to backend
  // if (spaceId && !tags.includes(spaceId)) {
  //   tags.push(spaceId)
  // }
  // console.log("----spaceData----", spaceData)

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
