import { IonCard, IonCardContent } from "@ionic/react"
import UserCard from "../../../components/packages/userCard"
import ConnectButton from "./ConnectButton"
import { useQuery } from "@apollo/client"
import { RecommendedConnectionList } from "../../../datasource/graphql/user"
import { USER_SERVICE_GQL } from "../../../datasource/servers/types"

function index() {
  const { data } = useQuery(RecommendedConnectionList, {
    context: { server: USER_SERVICE_GQL }
  })

  return (
    <IonCard>
      <IonCardContent>
        <h2>Recommended for you</h2>
        <div className="grid-3">
          {data?.recommendedConnectionList?.user.map((item, index) => {
            return (
              <UserCard
                key={index}
                profileBanner={item.coverPicture}
                profileImg={item.profileImg}
                name={item.name}
                username={item.username}
                loaction={item.loaction}
                oneLineBio={item.oneLineBio}
              >
                <ConnectButton user={item} />
              </UserCard>
            )
          })}
        </div>
      </IonCardContent>
    </IonCard>
  )
}

export default index
