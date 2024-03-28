import {useQuery} from "@apollo/client"
import {GetOrgSpace, GetTopOrgs, getUserProfile} from "@graphql/user"
import {createContext} from "react"
import {useSelector} from "react-redux"
import {useParams} from "react-router"
import {USER_SERVICE_GQL} from "servers/types"
import {getAllProps} from "./getAllProps"
import {Spaces} from "./template"

export const OrgContext = createContext()

export default function SpacePage({ allPropssetPopup }) {
  const params = useParams(),
    { data: topOrgData } = useQuery(GetTopOrgs, {
      variables: { limit: 6 },
      context: { server: USER_SERVICE_GQL }
    }),
    { user, loggedIn } = useSelector((store) => store?.userProfile),
    profileDataQuery = useQuery(getUserProfile, {
      context: { server: USER_SERVICE_GQL },
      variables: {
        username: user?.username
      }
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
      <Spaces allProps={allProps} />
    </OrgContext.Provider>
  )
}
