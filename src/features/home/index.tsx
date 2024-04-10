import React from "react"
import { useEffect, useRef } from "react"
import { Home } from "./template"
import { getAllPropsHome } from "./getAllProps"
import { useSelector } from "react-redux"
import { useQuery } from "@apollo/client"
import { USER_SERVICE_GQL } from "../../datasource/servers/types"
import { getUserProfile } from "../../datasource/graphql/user"
import { callSocket } from "../../datasource/servers/endpoints"
import { getCache } from "../../utils/cache"

export default function HomePage({ propsall }) {
  const socket = useRef<ReturnType<typeof callSocket> | null>(null);
  const { user, loggedIn } = useSelector((store) => store?.userProfile || {})

  const { loading, error, data, refetch } = useQuery(getUserProfile, {
    context: { server: USER_SERVICE_GQL },
    variables: {
      username: user?.username
    },
    skip: !loggedIn || !user?.username
  }),
    userInfo = data?.getUser?.user,
    allProps = getAllPropsHome({ user, loggedIn, userInfo, refetch, propsall })

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

  return <Home allProps={{ ...allProps, refetch }} />
}
