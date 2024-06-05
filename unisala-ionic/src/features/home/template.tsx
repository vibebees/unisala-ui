import React, { lazy } from "react";
import "./Home.css";
import useDocTitle from "@hooks/useDocTitile";
const CreateAPostCard = lazy(() => import("@components/packages/createAPost/template"));
import InfiniteFeed from "@components/packages/feed/Feed";

export const Home = () => {
  useDocTitle("Unisala");

  return (
      <div>
      <CreateAPostCard />
      <InfiniteFeed feedType="newsfeed" feedId={null} />
      </div>
  );
};
