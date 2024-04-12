import { useQuery } from "@apollo/client"
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow
} from "@ionic/react"
  import { useContext } from "react"
import { useHistory } from "react-router"
import { OrgContext } from ".."
import Tabs from "../tabs"
 import { USER_SERVICE_GQL } from "../../../datasource/servers/types"
import MemberList from "./memberList"
import "./members.css"
import {GetAllMembersBySpaceID} from "../../../datasource/graphql/user"
import {URLgetter, URLupdate} from "../../../utils/lib/URLupdate"
import {Row} from "../../../components/defaults"
import {ThreadSkeleton} from "../../../components/packages/skeleton/threadSkeleton"

export const Members = () => {
  const history = useHistory()
  const { orgId } = useContext(OrgContext)
  const { data, loading, error } = useQuery(GetAllMembersBySpaceID, {
    context: { server: USER_SERVICE_GQL },
    variables: { spaceId: orgId }
  })

  const myDefaultMembers = "Members"
  const typeOfMember = {
    options: [
      {
        name: myDefaultMembers,
        icon: "people",
        count: 6,
        nav: "members"
      },
      {
        name: "Students",
        icon: "business",
        count: 30,
        nav: "students"
      },
      {
        name: "Alumini",
        icon: "school",
        count: 600,
        nav: "alumini"
      }
    ],
    onClick: (event, nav) => {
      const updatedUrl = URLupdate("mem", nav)
      history.push({ search: updatedUrl })
    },
    scrollable: false
  }

  const memberType = URLgetter("mem") || myDefaultMembers

  if (loading) {
    return (
      <p>
        <ThreadSkeleton />
      </p>
    )
  }

  if (error) return <p>Error</p>

  return (
    <IonGrid className="ion-no-padding !shadow-none bg-none ion-no-margin  mt-3">
      <IonCard className="members-card !shadow-none  !m-0 mx-0 px-0 ion-no-margin">
        <IonCardHeader>
          <IonCardTitle className="members-title">
            {memberType.toUpperCase()} :{" "}
            {data && data?.getAllMemberBySpaceId?.data[memberType]?.length}
          </IonCardTitle>
        </IonCardHeader>
        <Row className="bg-white">
          <Tabs config={typeOfMember} />
        </Row>
      </IonCard>

      <br />
      <Row className="w-full">
        {data &&
          data?.getAllMemberBySpaceId?.data[memberType]?.map((user, index) => (
            <MemberList key={index} {...user} memberType={memberType} />
          ))}
        {data &&
          data?.getAllMemberBySpaceId?.data[memberType]?.length === 0 && (
            <IonCol className="mt-16">
              <p className="w-full text-center">No members found</p>
            </IonCol>
          )}
      </Row>
    </IonGrid>
  )
}
