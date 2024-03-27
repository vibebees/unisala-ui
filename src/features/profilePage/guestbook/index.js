import { useState } from "react"
import {
  IonCard,
  IonCardContent,
  IonText,
  IonButton,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonIcon
} from "@ionic/react"
import { ellipsisVertical } from "ionicons/icons"
import { Link } from "react-router-dom"
import { useQuery } from "@apollo/client"
import moment from "moment"
import jwtDecode from "jwt-decode"
import StateMessage from "component/stateMessage"
import emptyState from "assets/emptyState.png"
import "./index.css"
import { receivedGuestbookList } from "graphql/user"
import AddGuestBookPop from "./AddGuestBookPop"
import MorePop from "./MorePop"
import { USER_SERVICE_GQL } from "servers/types"
import { useSelector } from "react-redux"
import { ThreadSkeleton } from "component/skeleton/threadSkeleton"
import { Avatar } from "component/Avatar"

function index({ userId, firstName }) {
  const [page, setPage] = useState(0)
  const { accessToken } = useSelector((state) => state?.auth)
  const decode = accessToken && jwtDecode(accessToken)
  const [isOpen, setIsOpen] = useState(false)
  const [guestbookList, setGuestbookList] = useState([])

  const { loading, refetch } = useQuery(receivedGuestbookList, {
    fetchPolicy: "network-only",
    context: { server: USER_SERVICE_GQL },
    variables: {
      userId: userId,
      page: page,
      pageSize: 10
    },
    onCompleted: (data) => {
      setGuestbookList(data?.receivedGuestbookList?.guestbook)
    }
  })

  if (loading) {
    return ["0", "1", "2"].map((item) => {
      return <ThreadSkeleton key={item} />
    })
  }

  const guestbookLists = () => {
    return (
      <IonCardContent>
        <IonList lines="full">
          {Array.isArray(guestbookList) &&
            guestbookList.map((guestbookItem, i) => {
              const { firstName, lastName, username, picture } =
                guestbookItem?.user || {}

              const { message, date } = guestbookItem || {}
              return (
                <IonItem key={i} className="guestbook-li">
                  <IonAvatar slot="start">
                    <Avatar username={username} profilePic={picture} />
                  </IonAvatar>
                  <IonLabel>
                    <Link to={`/@/${username}`}>
                      <div className="inline-flex">
                        <h2>{firstName + " " + lastName}</h2>
                        <p className="p-grey">@{username}</p>
                        <p className="p-grey">
                          {moment(date).format("DD MMM YYYY")}
                        </p>
                      </div>
                    </Link>
                    <p>{message}</p>
                  </IonLabel>
                  <IonIcon icon={ellipsisVertical} />
                  <MorePop morePop={false} />
                </IonItem>
              )
            })}
        </IonList>
      </IonCardContent>
    )
  }

  return (
    <>
      {userId !== decode?._id && (
        <IonCard className="mb-2 max-md:mx-1">
          <IonCardContent className="card-bb">
            <h1>Guestbook</h1>
          </IonCardContent>
          <IonCardContent>
            <p>
              Leave a comment below. It could be anything – appreciation,
              information, wisdom, or even humor. Surprise me!
            </p>
          </IonCardContent>
          <IonCardContent className="guestbook-post">
            <IonText>
              <h2>Sign {firstName} Waiba&apos;s Guestbook</h2>
              <p>Share a message here.</p>
            </IonText>
            <IonButton
              onClick={() => {
                decode && setIsOpen(true)
              }}
              mode="ios"
            >
              {decode ? "Leave a message" : "Sign in"}
            </IonButton>
            <AddGuestBookPop
              setIsOpen={setIsOpen}
              userId={userId}
              isOpen={isOpen}
              refetch={refetch}
            />
          </IonCardContent>
        </IonCard>
      )}

      {!guestbookList?.length && (
        <IonCard>
          <StateMessage
            title={
              userId === decode?._id
                ? "You haven't received any messages!"
                : `${firstName} has not received any messages`
            }
            subtitle="All the guestbook messages will be visible here"
          >
            <img src={emptyState} alt="empty state" className="" />
          </StateMessage>
        </IonCard>
      )}

      {Array.isArray(guestbookList) && guestbookList?.length && (
        <IonCard className="mb-2">{guestbookLists()}</IonCard>
      )}
    </>
  )
}

export default index
