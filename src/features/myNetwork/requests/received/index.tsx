import { useQuery } from "@apollo/client"
import { ReceivedConnectionList } from "@datasource/graphql/user/"
import UserCard from "@components/packages/userCard"
import RequestReceivedButton from "./RequestReceivedButton"
import StateMessage from "@components/packages/stateMessage"
import emptyState from "@assets/emptyState.png"
import { USER_SERVICE_GQL } from "@datasource/servers/types"
import { IonCol, IonGrid, IonRow } from "@ionic/react"


// Assuming the existence of a TypeScript interface for user items
interface User {
  _id: string;
  coverPicture: string;
  picture: string;
  firstName: string;
  lastName: string;
  username: string;
  location: string;
  oneLinerBio: string;
}

const Index: React.FC = () => {
  const { data: receivedConnectionList } = useQuery<ConnectionListType>(ReceivedConnectionList, {
    fetchPolicy: "network-only",
    context: { server: USER_SERVICE_GQL },
  });

  return receivedConnectionList?.receivedConnectionList?.connectionList?.length ? (
    <IonGrid>
      <IonRow>
        {receivedConnectionList.receivedConnectionList.connectionList.map((item, index) => (
          <IonCol  key={item.user._id}>
            <UserCard
              profileBanner={item.user.coverPicture}
              profileImg={item.user.picture}
              name={`${item.user.firstName} ${item.user.lastName}`}
              username={item.user.username}
              location={item.user.location}
              oneLineBio={item.user.oneLinerBio}
            >
              <RequestReceivedButton reqUserId={item.user._id} reqUsername={item.user.username} />
            </UserCard>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  ) : (
    <StateMessage title="No Received Requests" subtitle="All the requests received will be visible here">
      <img src={emptyState} alt="empty state" />
    </StateMessage>
  );
};

export default Index;