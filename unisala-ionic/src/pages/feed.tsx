import React, { useEffect } from "react";
import Home from "../features/home";
import useViewDuration from "@hooks/useViewDuration";
import ReactGA from "react-ga4";

const PageHome = () => {
  const { getAllViewTime, deleteAllViewTime } = useViewDuration();

  useEffect(() => {
    window.onbeforeunload = () => {
      deleteAllViewTime();
    };

    return () => {
      const getAllDuration = getAllViewTime();
      ReactGA.event({
        category: "feed_view",
        action: "view_duration",
        value: getAllDuration,
      });
    };
  }, []);

  return <Home />;
};
export default PageHome;
