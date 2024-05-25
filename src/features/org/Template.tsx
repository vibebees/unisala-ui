import React, { Suspense, useState } from "react";
import { Col, Grid, Icon, Row, Spinner } from "@components/defaults";
import { arrowUpOutline } from "ionicons/icons";
import { lazy, useEffect } from "react";
import Tabs from "./tabs";
import NotJoinedWrapper from "./NotJoinedWrapper";
import "./Org.css";
import { useLocation } from "react-router";
import { configSegment } from "./configSegmentData";
import OrgHeader from "./OrgHeader";
import { useOrgContext } from ".";
import { URLgetter } from "@utils/lib/URLupdate";
const InfiniteFeed = lazy(() => import("@components/packages/feed/Feed"));
const CreateAPostCard = lazy(
  () => import("@components/packages/createAPost/template")
);
const Members = lazy(() => import("./org/members"));
const History = lazy(() => import("./org/history"));
const Invitation = lazy(() => import("./Invitation/Invitations"));
const InvitationRequest = lazy(() => import("./org/invitationRequest"));

type tabs =
  | "feed"
  | "org"
  | "history"
  | "invite"
  | "invitationRequest"
  | "apply";

const Org = () => {
  const [tab, setTab] = useState<tabs>("feed");
  const { _id } = useOrgContext();
  const location = useLocation();
  const tags = [_id];

  useEffect(() => {
    const activeTab = URLgetter("t") || "feed";
    setTab(activeTab as tabs);
  }, [location.search]);

  const scrollToTop = () => {
    if (!document) return;

    document
      .querySelector(".ThreadContainer")!
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-full" color="light">
      <Grid className="gridStyle">
        <Row className="flex flex-nowrap">
          <Col className="colStyle ThreadContainer">
            <OrgHeader />
            <Row class="bg-white mt-4 sticky top-0 z-[1000] max-md:top-16">
              <Tabs config={configSegment} />
            </Row>
            <div className="min-h-[50vh] ">
              {tab === "feed" && (
                <Suspense fallback={<Spinner></Spinner>}>
                  <div className="mt-4">
                    <NotJoinedWrapper
                      isJoined={true}
                      message="Please Join the orgranization to post"
                    >
                      <CreateAPostCard allProps={{ tags }} />
                    </NotJoinedWrapper>
                    <InfiniteFeed feedType="specificOrg" feedId={_id} />
                  </div>
                </Suspense>
              )}

              {tab === "org" && (
                <Suspense fallback={<Spinner></Spinner>}>
                  <Members />
                </Suspense>
              )}

              {tab === "history" && (
                <Suspense fallback={<Spinner></Spinner>}>
                  <History />
                </Suspense>
              )}

              {tab === "invite" && (
                <Suspense fallback={<Spinner></Spinner>}>
                  <Invitation />
                </Suspense>
              )}

              {tab === "invitationRequest" && (
                <Suspense fallback={<Spinner></Spinner>}>
                  <InvitationRequest />
                </Suspense>
              )}

              {tab === "apply" && (
                <Suspense fallback={<Spinner></Spinner>}>
                  <div className="bg-white">
                    <Col>
                      <h4 className="font-semibold pl-4">Your next steps</h4>
                      <div className="h-full mt-4 px-4 border border-neutral-400 border-opacity-20 rounded-md py-6"></div>
                    </Col>
                  </div>
                </Suspense>
              )}
            </div>
          </Col>
        </Row>
      </Grid>
      <button className="scrollButton" onClick={scrollToTop}>
        <Icon icon={arrowUpOutline} className="scrollIcon" />
      </button>
    </div>
  );
};

export default Org;
