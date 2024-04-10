import {useQuery} from "@apollo/client"
import {GetOrgSpace, GetTopOrgs, getUserGql} from "../../datasource/graphql/user"
import {createContext} from "react"
import {useSelector} from "react-redux"
import {useParams} from "react-router"
 import {getAllProps} from "./getAllProps"
import {Orgs} from "./template"
import {USER_SERVICE_GQL} from "../../datasource/servers/types"
import {userName} from "../../utils/cache"

export const OrgContext = createContext()

export default function OrgPage() {
  const params = useParams(),
    { data: topOrgData } = useQuery(GetTopOrgs, {
      variables: { limit: 6 },
      context: { server: USER_SERVICE_GQL }
    }),
    { user, loggedIn } = useSelector((store) => store?.userProfile),
    profileDataQuery = useQuery(getUserGql, {
      context: { server: USER_SERVICE_GQL },
      variables: {
        username:userName,
      },
      skip: !userName,
      fetchPolicy:"cache-first"

    }),
    { data, loading } = useQuery(GetOrgSpace, {
      context: { server: USER_SERVICE_GQL },
      variables: { name: params?.category }
    })

  const profileData = loggedIn ? profileDataQuery.data : null

  const allProps = getAllProps({
    user,
    loggedIn,
    profileData,
    topOrgData,
    loading,
    data
  })

  return (
    <OrgContext.Provider value={allProps}>
      <Orgs allProps={allProps} />
    </OrgContext.Provider>
  )
}
