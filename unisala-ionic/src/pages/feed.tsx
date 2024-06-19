import React, { useEffect } from "react";
import Home from "../features/home";
import useViewDuration from "@hooks/useViewDuration";

const PageHome = () => {
  const { getAllViewTime, deleteAllViewTime } = useViewDuration();
  useEffect(() => {
    window.onbeforeunload = () => {
      deleteAllViewTime();
    };

    return () => {
      const getAllDuration = getAllViewTime();
      console.log("getAllDuration", getAllDuration);
    };
  }, []);

  return <Home />;
};
export default PageHome;
