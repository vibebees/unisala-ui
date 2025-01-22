import React, { useMemo } from "react";
import {
  ExploreIcon,
  HomeIcon,
  PeopleIcon,
  MessageIcon,
} from "./../components/packages/icons";
import { getCache, userName } from "../utils/cache";
import { useAuth } from "@context/AuthContext";

const useRoutes = () => {


  const { username, authenticated } = useAuth();
  // TODO: check issue here
  const routes = useMemo(() => {
    const baseRoutes = [
      {
        name: authenticated ? "Feed" : "Home",
        Icon: HomeIcon,
        link: authenticated ? "/feed" : "/home",
      },
      {
        name: "Explore Universities",
        Icon: ExploreIcon,
        link: "/search?tab=uni",
      },
      {
        name: "Network",
        Icon: PeopleIcon,
        link: authenticated ? "/mynetwork" : null,  // Hide or disable this link based on authenticated status
      },
      {
        name: "Messages",
        Icon: MessageIcon,
        link: authenticated ? "/messages" : null,  // Hide or disable this link based on authenticated status
      },
      {
        name: authenticated ? "Profile" : "Login",
        Icon: PeopleIcon,
        link: authenticated ? `/profile/${username}` : "/login",
      },
    ];

    // Filter out routes that should not be displayed for unauthenticated users
    return baseRoutes.filter(route => route.link !== null);
  }, [authenticated, username]);

  return routes;
};

export default useRoutes;
