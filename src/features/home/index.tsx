import React from "react";
import { useRef } from "react";
import { Home } from "./template";
import { getAllPropsHome } from "./getAllProps";
import { useQuery } from "@apollo/client";
import { USER_SERVICE_GQL } from "../../datasource/servers/types";
import { getUserGql } from "../../datasource/graphql/user";
import { callSocket } from "../../datasource/servers/endpoints";
import { userName, getCache } from "../../utils/cache";
import Layout from "../../layouts/layout";
import { LeftSideBar } from "./leftSideBar";
import { FamousUniversities } from "../../components/packages/famousUniversites";
export default function HomePage() {
  const socket = useRef<ReturnType<typeof callSocket> | null>(null);
  const loggedIn = getCache("refreshToken");

  const { loading, error, data, refetch } = useQuery(getUserGql, {
      context: { server: USER_SERVICE_GQL },
      variables: {
        username: userName,
      },
      skip: !loggedIn || !userName,
      fetchPolicy: "network-only", // Used for first execution
      nextFetchPolicy: "cache-first", //
    }),
    allProps = getAllPropsHome({ loggedIn, refetch });

  // useEffect(() => {
  //   socket.current = callSocket();

  //   socket.current.on("connect", (msg) => {
  //     console.log("callSocket connected");
  //   });

  //   return () => {
  //     socket.current.disconnect();
  //     console.log("callSocket disconnected");
  //   };
  // }, []);
  return (
    <Layout leftSidebar={<LeftSideBar />} rightSidebar={<FamousUniversities />}>
      <Home allProps={allProps} />
    </Layout>
  );
}
