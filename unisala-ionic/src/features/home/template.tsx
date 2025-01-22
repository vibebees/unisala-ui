import React, { lazy, useEffect } from "react";
import "./Home.css";
import useDocTitle from "@hooks/useDocTitile";
const CreateAPostCard = lazy(() => import("@components/packages/createAPost/template"));
import InfiniteFeed from "@components/packages/feed/Feed";
import { trackEvent } from "@components/analytics";

export const Home = () => {
  useDocTitle("Unisala");

  useEffect(() => {
    trackEvent({
      action: "Feed_page_view",
      category: "Feed_view",
      label: "Feed_view",
    });
  }, []);

  return (
      <div>
      <CreateAPostCard allProps={{}} />
      <InfiniteFeed feedType="newsfeed" feedId={null} />
      </div>
  );
};
