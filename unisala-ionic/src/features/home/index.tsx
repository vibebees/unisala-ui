import React, { useEffect } from "react";
import { Home } from "./template";
import { FamousUniversities } from "../../components/packages/famousUniversites";
import FixedLayout from "@layouts/FixedLayout";
import { LeftSideBar } from "@components/packages/spacesAndOrgs";
export default function HomePage() {
  // const socket = useRef<ReturnType<typeof callSocket> | null>(null);

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
      <FixedLayout
        leftSidebar={<LeftSideBar/>}
        rightSidebar={<FamousUniversities />}
      >
        <Home />
      </FixedLayout>
  );
}
