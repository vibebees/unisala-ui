import React from "react"
import {useQuery} from "@apollo/client"
import {
  GetSpaceCategory,
  GetTopActiveSpaces,
} from "@datasource/graphql/user"
import {useParams} from "react-router"
import {USER_SERVICE_GQL} from "@datasource/servers/types"
import {getAllProps} from "./getAllProps"
import {Spaces} from "./template"
import {useAuth} from "@context/AuthContext";

export default function SpacePage() {
  const params = useParams(),
    {user, authenticated: loggedIn} = useAuth(),
    profileData = loggedIn,
    {data, loading} = useQuery(GetSpaceCategory, {
      context: {server: USER_SERVICE_GQL},
      variables: {q: params.category}
    })

  return <Spaces data = {data} loading={loading} />
}

