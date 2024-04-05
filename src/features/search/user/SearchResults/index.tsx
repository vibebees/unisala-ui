import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle
} from "@ionic/react"
import { useQuery } from "@apollo/client"
import { userSearch } from "graphql/user"
import UserCard from "component/userCard"
import noResultsFound from "assets/no-results.jpg"
import { USER_SERVICE_GQL } from "servers/types"

function index({ query }) {
  const { data } = useQuery(userSearch(query), {
    context: { server: USER_SERVICE_GQL }
  })

  if (!data?.searchUser?.user?.length) {
    return (
      <IonCard style={{ textAlign: "center" }}>
        <img alt="unisala: no results found" src={noResultsFound} />
        <IonCardHeader>
          <IonCardTitle>Sorry! No result found &#9785;</IonCardTitle>
          <IonCardSubtitle>
            There were not any saved views, recent queries, or source matching
            your search.
          </IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
    )
  }

  return (
    <div className="grid-3">
      {data?.searchUser?.user.map((user, index) => (
        <UserCard
          key={index}
          profileBanner={user?.coverPicture}
          profileImg={user?.picture}
          name={user?.firstName + " " + user?.lastName}
          username={user?.username}
          loaction={user?.location}
          oneLineBio={user?.oneLineBio}
        />
      ))}
    </div>
  )
}

export default index
