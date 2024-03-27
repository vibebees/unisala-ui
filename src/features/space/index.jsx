import {useQuery} from "@apollo/client"
import {
  GetSpaceCategory,
  GetTopActiveSpaces,
  getUserProfile
} from "graphql/user"
import {useSelector} from "react-redux"
import {useParams} from "react-router"
import {USER_SERVICE_GQL} from "servers/types"
import {getAllProps} from "./getAllProps"
import {Spaces} from "./template"

export default function SpacePage({ allPropssetPopup }) {
  const params = useParams(),
    { data: topSpaceData } = useQuery(GetTopActiveSpaces, {
      variables: { limit: 6 },
      context: { server: USER_SERVICE_GQL }
    }),
    { user, loggedIn } = useSelector((store) => store?.userProfile),
    profileData =
      loggedIn &&
      useQuery(getUserProfile, {
        context: { server: USER_SERVICE_GQL },
        variables: {
          username: user?.username
        }
      }),
    { data, loading } = useQuery(GetSpaceCategory, {
      context: { server: USER_SERVICE_GQL },
      variables: { q: params.category }
    })

  const allProps = getAllProps({
    user,
    loggedIn,
    profileData,
    data,
    topSpaceData,
    loading
  })

  return <Spaces allProps={allProps} />
}

