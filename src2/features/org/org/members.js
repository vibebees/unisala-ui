import {useQuery} from "@apollo/client"
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow
} from "@ionic/react"
import {ThreadSkeleton} from "component/skeleton/threadSkeleton"
import {useContext} from "react"
import {useHistory} from "react-router"
import {URLgetter, URLupdate} from "utils/lib/URLupdate"
import {OrgContext} from ".."
import Tabs from "../../../component/tabs"
import UserCard from "../../../component/userCard"
import {GetAllMembersBySpaceID} from "@graphql/user"
import {USER_SERVICE_GQL} from "servers/types"
import "./members.css"

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

  if (loading) return <p><ThreadSkeleton/></p>
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
        <IonRow className="bg-white">
          <Tabs config={typeOfMember} />
        </IonRow>
      </IonCard>

      <IonRow>
        {data &&
          data?.getAllMemberBySpaceId?.data[memberType]?.map((user, index) => (
            <IonCol
              key={index}
              size="12"
              sizeSm="6"
              sizeMd="4"
              sizeLg="4"
              sizeXl="4"
            >
              <UserCard
                key={index}
                profileBanner={user?.coverPicture}
                profileImg={user?.picture}
                name={user?.firstName + " " + user?.lastName}
                username={user?.username}
                loaction={user?.location}
                oneLineBio={memberType}
              />
            </IonCol>
          ))}
        {data &&
          data?.getAllMemberBySpaceId?.data[memberType]?.length === 0 && (
            <IonCol className="mt-16">
              <p className="w-full text-center">No members found</p>
            </IonCol>
          )}
      </IonRow>
    </IonGrid>
  )
}
