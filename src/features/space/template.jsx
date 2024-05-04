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

export const Spaces = ({allProps}) => {

  const {
    spaceId,
    tags,
    loading,
    spaceCategory,
    searchSpaceCategory,
    setTab
  } = allProps

  useEffect(() => {
    const queryString = window.location.search
    const queryParams = new URLSearchParams(queryString)
    const flagValue = queryParams.get("address") || "feed"

    setTab(flagValue)
  }, [ window.location.search ])

  // condition because we do not want to send null datas to backend
  if (spaceId && !tags.includes(spaceId)) {
    tags.push(spaceId)
  }

  if (loading) {
    return <PreLoader />
  }

  if (!spaceCategory) {
    return <PageNotFound />
  }

  return (
    <div color="light">
      <SpaceHeader spaceDetails={searchSpaceCategory?.data} />
      <CreateAPostCard allProps={allProps} />
      <InfiniteFeed feedId={spaceId} feedType={"specificSpace"} />
    </div>
  )
}
