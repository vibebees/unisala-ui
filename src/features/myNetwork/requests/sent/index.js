import { useQuery } from "@apollo/client"
import { PendingConnectionList } from "graphql/user/"
import UserCard from "component/userCard"
import StateMessage from "component/stateMessage"
import emptyState from "assets/emptyState.png"
import PendingRequestButton from "./PendingRequestButton"
import { USER_SERVICE_GQL } from "servers/types"

function index() {
  const { data: pendingConnectionList } = useQuery(PendingConnectionList, {
    fetchPolicy: "network-only",
    context: { server: USER_SERVICE_GQL }
  })

  return pendingConnectionList?.pendingConnectionList?.connectionList.length ? (
    <div className="grid-3">
      {pendingConnectionList?.pendingConnectionList?.connectionList.map(
        (item, index) => {
          return (
            <UserCard
              key={index}
              profileBanner={item.user?.coverPicture}
              profileImg={item?.user?.picture}
              name={item.user.firstName + " " + item.user.lastName}
              username={item.user.username}
              loaction={item.user.location}
              oneLineBio={item.user.oneLinerBio}
            >
              <PendingRequestButton user={item} />
            </UserCard>
          )
        }
      )}
    </div>
  ) : (
    <StateMessage
      title="No Pending Requests"
      subtitle="Start connecting with people"
    >
      <img src={emptyState} alt="empty state" className="state-img" />
    </StateMessage>
  )
}

export default index
