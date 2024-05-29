import { useState } from "react"
import { IonCard, IonCardContent, Text, IonIcon } from "@ionic/react"
import { people } from "ionicons/icons"
import { useQuery } from "@apollo/client"
import { useSelector } from "react-redux"
import { ConnectedList } from "../../../datasource/graphql/user/"
import { USER_SERVICE_GQL } from "../../../datasource/servers/types"
import ConnectedListModal from "./ConnectedList"
import { Card, CardContent, Icon, Text } from "../../../components/defaults"

function index() {
  const [isOpen, setIsOpen] = useState(false),
    { user } = useSelector((store) => store?.userProfile),
    { data } = useQuery(ConnectedList, {
      context: { server: USER_SERVICE_GQL },
      variables: { userId: user._id },
    })


  return (
    <Card>
      <CardContent>
        <Text color="dark">Manage network</Text>
        <div
          className="flex mt-05"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          <div className="inline-2" style={{ cursor: "pointer" }}>
            <Icon icon={people} className="grey-icon-32" />
            <h2>Connections</h2>
          </div>
          <h2>
            {data?.connectedList?.connectionList &&
              data?.connectedList?.connectionList.length}
          </h2>
        </div>
        <ConnectedListModal isOpen={isOpen} setIsOpen={setIsOpen} data={data} />
      </CardContent>
    </Card>
  )
}

export default index
