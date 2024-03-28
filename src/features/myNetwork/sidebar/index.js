import { useState } from "react"
import { IonCard, IonCardContent, IonText, IonIcon } from "@ionic/react"
import { people } from "ionicons/icons"
import { useQuery } from "@apollo/client"
import { useSelector } from "react-redux"
import { ConnectedList } from "@graphql/user/"
import { USER_SERVICE_GQL } from "servers/types"
import ConnectedListModal from "./ConnectedList"

function index() {
  const [isOpen, setIsOpen] = useState(false),
    { user } = useSelector((store) => store?.userProfile),
    { data } = useQuery(ConnectedList, {
      context: { server: USER_SERVICE_GQL },
      variables: { userId: user._id },
      fetchPolicy: "network-only"
    })

  return (
    <IonCard>
      <IonCardContent>
        <IonText color="dark">Manage network</IonText>
        <div
          className="flex mt-05"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          <div className="inline-2" style={{ cursor: "pointer" }}>
            <IonIcon icon={people} className="grey-icon-32" />
            <h2>Connections</h2>
          </div>
          <h2>
            {data?.connectedList?.connectionList &&
              data?.connectedList?.connectionList.length}
          </h2>
        </div>
        <ConnectedListModal isOpen={isOpen} setIsOpen={setIsOpen} data={data} />
      </IonCardContent>
    </IonCard>
  )
}

export default index
