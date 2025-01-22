import React, { useEffect } from "react";
import Home from "../features/home";
import useViewDuration from "@hooks/useViewDuration";
import ReactGA from "react-ga4";
import { trackEvent } from "@components/analytics";

const PageHome = () => {
  const { getAllViewTime, deleteAllViewTime } = useViewDuration();

  useEffect(() => {
    window.onbeforeunload = () => {
      deleteAllViewTime();
    };

    return () => {
      const getAllDuration = getAllViewTime();

      for (const key in getAllDuration) {
        trackEvent({
          action: "Feed_post_" + key + "_view_duration",
          category: "Feed_view",
          label: getAllDuration[ key ],
          value: getAllDuration[ key ],
        });
      }
    };
  }, []);

  return <Home />;
};
export default PageHome;
