import { IonCol, IonContent, IonGrid, IonIcon, IonRow } from "@ionic/react"
import { arrowUpOutline } from "ionicons/icons"
import { useEffect } from "react"
import { SpaceNotFound } from "../../component/PageNotFound"
import InfiniteFeed from "../../component/feed/Feed"
import CreateAPostCard from "../../component/post/template"
import Tabs from "../../component/tabs"
import Invitation from "./Invitation/Invitations"
import NotJoinedWrapper from "./NotJoinedWrapper"
import "./Space.css"
import SpaceHeader from "./SpaceHeader"
import { History } from "./org/history"
import { InvitationRequest } from "./org/invitationRequest"
import { Members } from "./org/members"
import { PreLoader } from 'component/custom-components/preloader'
export const Spaces = ({ allProps }) => {
  const {
    handleResize,
    loggedIn,
    orgId,
    tags,
    loading,
    orgData,
    user,
    width,
    views,
    isJoined,
    configSegment,
    tab,
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
  if (orgId && !tags.includes(orgId)) {
    tags.push(orgId)
  }

  if (loading) {
    return <PreLoader />
  }

  if (!orgData) {
    return <SpaceNotFound />
  }

  const scrollToTop = () => {
    document
      .querySelector(".ThreadContainer")
      .scrollIntoView({ behavior: "smooth" })
  }

  const Feed = () => (
    <div className="mt-4">
      <NotJoinedWrapper
        isJoined={true}
        message="Please Join the orgranization to post"
      >
        <CreateAPostCard allProps={allProps} />
      </NotJoinedWrapper>
      <InfiniteFeed feedType="specificOrg" feedId={orgId} />
    </div>
  )

  const tabs = {
    feed: <Feed />,
    org: <Members />,
    history: <History />,
    apply: (
      <div className="bg-white">
        <IonCol>
          <h4 className="font-semibold pl-4">Your next steps</h4>
          <div className="h-full mt-4 px-4 border border-neutral-400 border-opacity-20 rounded-md py-6"></div>
        </IonCol>
      </div>
    ),
    invite: <Invitation orgId={orgId} />,
    invitationRequest: <InvitationRequest />
    // ,
    // apply: (<Apply />),
    //
  }
  const SpaceBody = () => {
    return tabs[tab]
  }
  const Space = () => (
    <IonCol className="colStyle ThreadContainer">
      <SpaceHeader spaceDetails={orgData} />
      <IonRow class="bg-white mt-4 sticky top-0 z-[1000] max-md:top-16">
        <Tabs config={configSegment} />
      </IonRow>
      <div className="min-h-[50vh] ">
        <SpaceBody />
      </div>
    </IonCol>
  )

  return (
    <IonContent className="h-full" color="light">
      {width < 768 && views.lessThan768}
      <IonGrid className="gridStyle">
        <IonRow className="flex flex-nowrap">
          {width > 768 && views.greaterThan768}

          <Space />
          {width > 1200 && <div className="pl-4">{views.greaterThan1000}</div>}
        </IonRow>
      </IonGrid>
      <button className="scrollButton" onClick={scrollToTop}>
        <IonIcon icon={arrowUpOutline} className="scrollIcon" />
      </button>
    </IonContent>
  )
}
