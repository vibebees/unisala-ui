import { IonCol, IonContent, IonGrid, IonIcon, IonRow } from "@ionic/react"
import InfiniteFeed from "component/feed/Feed"
import { arrowUpOutline } from "ionicons/icons"
import { useEffect } from "react"
import { SpaceNotFound } from "../../component/PageNotFound"
import CreateAPostCard from "../../component/post/template"
import PreLoader from "../../component/preloader"
import "./Space.css"
import SpaceHeader from "./SpaceHeader"
import UnisalaIntro from "./UnisalaIntro"

export const Spaces = ({ allProps }) => {
  // TOP SPACES

  const {
    handleResize,
    loggedIn,
    spaceId,
    tags,
    loading,
    spaceCategory,
    searchSpaceCategory,
    width,
    views,
    setTab
  } = allProps
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const queryString = window.location.search
    const queryParams = new URLSearchParams(queryString)
    const flagValue = queryParams.get("address") || "feed"

    setTab(flagValue)
  }, [window.location.search])

  // condition because we do not want to send null datas to backend
  if (spaceId && !tags.includes(spaceId)) {
    tags.push(spaceId)
  }

  if (loading) {
    return <PreLoader />
  }

  if (!spaceCategory) {
    return <SpaceNotFound />
  }
  const scrollToTop = () => {
    document
      .querySelector(".ThreadContainer")
      .scrollIntoView({ behavior: "smooth" })
  }

  return (
    <IonContent color="light">
      {width < 768 && views.lessThan768}
      <IonGrid
        style={{
          width: width >= 768 ? "95%" : "100%",
          margin: "auto",
          maxWidth: "1200px"
        }}
      >
        <IonRow
          style={{
            justifyContent: "flex-start",
            margin: "0 auto"
          }}
          className="max-width-container flex-nowrap"
        >
          {width > 768 && views.greaterThan768}
          <IonCol
            style={{
              maxWidth: "700px",
              margin: "auto",
              minHeight: "calc(90vh)"
            }}
            className="ThreadContainer"
          >
            <SpaceHeader spaceDetails={searchSpaceCategory?.data} />
            {loggedIn && width >= 768 && (
              <CreateAPostCard allProps={allProps} />
            )}
            {loggedIn ? (
              <InfiniteFeed feedId={spaceId} feedType={"specificSpace"} />
            ) : (
              <UnisalaIntro />
            )}
          </IonCol>

          <IonCol className="max-w-max">
            {width > 1000 && views.greaterThan1000}
          </IonCol>
        </IonRow>
      </IonGrid>
      <button className="scrollButton" onClick={scrollToTop}>
        <IonIcon icon={arrowUpOutline} className="scrollIcon" />
      </button>
    </IonContent>
  )
}
