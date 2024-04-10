import { IonCol, IonContent, IonGrid, IonIcon, IonRow } from "@ionic/react"
import { arrowUpOutline } from "ionicons/icons"
import { lazy, useEffect } from "react"
 import CreateAPostCard  from "../../components/packages/createAPost/template"
 import Tabs from "./tabs"
import Invitation from "./Invitation/Invitations"
import NotJoinedWrapper from "./NotJoinedWrapper"
import "./Space.css"
import SpaceHeader from "./SpaceHeader"
import { History } from "./org/history"
import { InvitationRequest } from "./org/invitationRequest"
import { Members } from "./org/members"
import {SpaceNotFound} from "../../navigation/PageNotFound"
import {PreLoader} from "../../components/packages/preloader"
const InfiniteFeed = lazy(() => import("../../components/packages/feed/Feed"))
export const Orgs = ({ allProps }) => {
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
  const OrgBody = () => {
    return tabs[tab]
  }
  const Org = () => (
    <IonCol className="colStyle ThreadContainer">
      <SpaceHeader spaceDetails={orgData} />
      <IonRow class="bg-white mt-4 sticky top-0 z-[1000] max-md:top-16">
        <Tabs config={configSegment} />
      </IonRow>
      <div className="min-h-[50vh] ">
        <OrgBody />
      </div>
    </IonCol>
  )

  return (
    <IonContent className="h-full" color="light">
      <IonGrid className="gridStyle">
        <IonRow className="flex flex-nowrap">

          <Org />
        </IonRow>
      </IonGrid>
      <button className="scrollButton" onClick={scrollToTop}>
        <IonIcon icon={arrowUpOutline} className="scrollIcon" />
      </button>
    </IonContent>
  )
}
