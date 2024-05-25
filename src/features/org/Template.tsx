import React, { useState } from "react";
import { Col, Grid, Icon, Row } from "@components/defaults";
import { arrowUpOutline } from "ionicons/icons";
import { lazy, useEffect } from "react";
import CreateAPostCard from "@components/packages/createAPost/template";
import Tabs from "./tabs";
import Invitation from "./Invitation/Invitations";
import NotJoinedWrapper from "./NotJoinedWrapper";
import "./Org.css";
import { configSegment } from "./configSegmentData";
import OrgHeader from "./OrgHeader";
import { History } from "./org/history";
import { InvitationRequest } from "./org/invitationRequest";
import { Members } from "./org/members";
import { useOrgContext } from ".";
const InfiniteFeed = lazy(() => import("@components/packages/feed/Feed"));

const Org = () => {
  const [tab, setTab] = useState("feed");
  const { _id } = useOrgContext();
  const tags = [_id];

  useEffect(() => {
    const queryString = window.location.search;
    const queryParams = new URLSearchParams(queryString);
    const flagValue = queryParams.get("address") || "feed";

    setTab(flagValue);
  }, [window.location.search]);

  const scrollToTop = () => {
    document
      .querySelector(".ThreadContainer")
      .scrollIntoView({ behavior: "smooth" });
  };

  const Feed = () => (
    <div className="mt-4">
      <NotJoinedWrapper
        isJoined={true}
        message="Please Join the orgranization to post"
      >
        <CreateAPostCard allProps={{ tags }} />
      </NotJoinedWrapper>
      <InfiniteFeed feedType="specificOrg" feedId={_id} />
    </div>
  );

  const tabs = {
    feed: <Feed />,
    org: <Members />,
    history: <History />,
    apply: (
      <div className="bg-white">
        <Col>
          <h4 className="font-semibold pl-4">Your next steps</h4>
          <div className="h-full mt-4 px-4 border border-neutral-400 border-opacity-20 rounded-md py-6"></div>
        </Col>
      </div>
    ),
    invite: <Invitation orgId={_id} />,
    invitationRequest: <InvitationRequest />,
    // ,
    // apply: (<Apply />),
    //
  };
  const OrgBody = () => {
    return tabs[tab];
  };
  const Org = () => (
    <Col className="colStyle ThreadContainer">
      <OrgHeader />
      <Row class="bg-white mt-4 sticky top-0 z-[1000] max-md:top-16">
        <Tabs config={configSegment} />
      </Row>
      <div className="min-h-[50vh] ">
        <OrgBody />
      </div>
    </Col>
  );

  return (
    <div className="h-full" color="light">
      <Grid className="gridStyle">
        <Row className="flex flex-nowrap">
          <Org />
        </Row>
      </Grid>
      <button className="scrollButton" onClick={scrollToTop}>
        <Icon icon={arrowUpOutline} className="scrollIcon" />
      </button>
    </div>
  );
};

export default Org;
