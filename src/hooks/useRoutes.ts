import React, { useMemo } from "react";
import {
  ExploreIcon,
  HomeIcon,
  PeopleIcon,
  MessageIcon,
} from "./../components/packages/icons";
import { getCache, userName } from "../utils/cache";

const useRoutes = () => {
  const authenticated = getCache("refreshToken");
  let profileLink = authenticated ? "/@/" + userName : "/profile";
  const routes = useMemo(
    () => [
      {
        name: "Home",
        Icon: HomeIcon,
        link: "/home",
      },
      {
        name: "Explore Universities",
        Icon: ExploreIcon,
        link: "/search?tab=uni",
      },
      {
        name: " Network",
        Icon: PeopleIcon,
        link: "/mynetwork",
      },
      {
        name: "Messages",
        Icon: MessageIcon,
        link: "/messages",
        count: 0,
      },
      {
        name: "Profile",
        Icon: PeopleIcon,
        link: profileLink,
      },
    ],
    [authenticated]
  );
  return routes;
};

export default useRoutes;
