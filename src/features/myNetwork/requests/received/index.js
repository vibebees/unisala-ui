import { useQuery } from "@apollo/client"
import { ReceivedConnectionList } from "@graphql/user/"
import UserCard from "component/userCard"
import RequestReceivedButton from "./RequestReceivedButton"
import StateMessage from "component/stateMessage"
import emptyState from "assets/emptyState.png"
import { USER_SERVICE_GQL } from "servers/types"

function index() {
  const { data: receivedConnectionList } = useQuery(ReceivedConnectionList, {
    fetchPolicy: "network-only",
    context: { server: USER_SERVICE_GQL }
  })

  return receivedConnectionList?.receivedConnectionList?.connectionList
    ?.length ? (
    <div className="grid-3">
      {receivedConnectionList?.receivedConnectionList?.connectionList.map(
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
              <RequestReceivedButton
                reqUserId={item.user._id}
                reqUsername={item.user.username}
              />
            </UserCard>
          )
        }
      )}
    </div>
  ) : (
    <StateMessage
      title="No Received Requests"
      subtitle="All the requests received will be visible here"
    >
      <img src={emptyState} alt="empty state" className="state-img" />
    </StateMessage>
  )
}

export default index
