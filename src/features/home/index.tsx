import React from "react"
import { useEffect, useRef } from "react"
import { Home } from "./template"
import { getAllPropsHome } from "./getAllProps"
import { useSelector } from "react-redux"
import { useQuery } from "@apollo/client"
import { USER_SERVICE_GQL } from "../../datasource/servers/types"
import { getUserProfile } from "../../datasource/graphql/user"
import { callSocket } from "../../datasource/servers/endpoints"
import { userName , userInfo} from "../../utils/cache"
import Layout from "../../pages/layout"
import {LeftSideBar} from "./leftSideBar"
import { all } from "axios"
export default function HomePage({ propsall }) {
  const socket = useRef<ReturnType<typeof callSocket> | null>(null);
  const { loggedIn } = userInfo
  console.log( !loggedIn ,  !userName)
   const { loading, error, data, refetch } = useQuery(getUserProfile, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      username: userName
    },
    skip: !loggedIn || !userName
  }),
    allProps = getAllPropsHome({ user: userInfo, loggedIn, refetch, propsall })

  useEffect(() => {
    socket.current = callSocket()

    socket.current.on("connect", (msg) => {
      console.log("callSocket connected")
    })

    return () => {
      socket.current.disconnect()
      console.log("callSocket disconnected")
    }
  }, [])
  console.log(allProps, "allProps")
  return <Layout
    mainContent={<Home allProps = {allProps} />}
    leftSidebar={< LeftSideBar { ...allProps} />}
  />
}
