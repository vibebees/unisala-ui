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
  let profileLink = '/profile/' + username
  const home = {
    link: authenticated ? "/feed" : "/home",
    name: authenticated ? "Feed" : "Home",
  };

  const profile = {
    link: authenticated ? `/profile/${username}` : "/login",
    name: authenticated ? "Profile" : "Login",
  };

  const routes = useMemo(() => {
    const baseRoutes = [
      {
        name: home.name,
        Icon: HomeIcon,
        link: home.link,
      },
      {
        name: "Explore Universities",
        Icon: ExploreIcon,
        link: "/search?tab=uni",
      },
      {
        name: profile.name,
        Icon: PeopleIcon,
        link: profile.link,
      },
    ];

    // Add Messages only if the user is authenticated
    if (authenticated) {
      baseRoutes.push({
        name: "Messages",
        Icon: MessageIcon,
        link: "/messages",
       });

      baseRoutes.push( {
        name: "Network",
        Icon: PeopleIcon,
        link: "/mynetwork",
      },)
    }

    return baseRoutes;
  }, [authenticated ]) // Dependencies on which useMemo depends

  return routes;
};

export default useRoutes;
