import {useQuery} from "@apollo/client"
import {
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonItemDivider,
  IonText
} from "@ionic/react"
import ImageWithLoader from "component/Reusable/Image/ImageWithLoader"
import {Event} from "component/events"
import Thread from "component/thread"
import {Button, Card, Col, Grid, Row} from "component/ui"
import {getNewsFeed, getUserGql} from "graphql/user"
import {location, schoolOutline} from "ionicons/icons"
import {useState} from "react"
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {USER_SERVICE_GQL} from "servers/types"
import {FeedSkeleton} from "../skeleton/feedSkeleton"
import {defaultUniImages} from "./default.images"
const Post = ({ post, allProps, feedType, feedId }) => {
  return (
    <div
      style={{
        width: "100%",
        marginTop: "10px"
        // borderTop: "1px solid #e0e0e0"
      }}
      className="max-md:border-none"
    >
      <Thread
        thread={post}
        id={post._id}
        allProps={allProps}
        feedType={feedType}
        feedId={feedId}
        key={post?._id || post}
      />
    </div>
  )
}

const University = ({ post, studyLevel }) => {
  const { user } = useSelector((state) => state.userProfile)
  const { elevatorInfo } = post
  const { studentCharges } = post
  const formattedAddress = `${elevatorInfo.address.city}, ${elevatorInfo.address.stateAbbreviation}, ${elevatorInfo.address.streetAddressOrPOBox}`
  return (
    <Card
      style={{
        width: "100%",
        marginTop: "10px"
        // borderTop: "1px solid #e0e0e0"
      }}
      className="max-md:border-none ion-no-margin"
    >
      <IonCardHeader>
        <IonCardSubtitle>Suggested University</IonCardSubtitle>
      </IonCardHeader>
      <Grid>
        <Link to={`/university/${elevatorInfo.name}`}>
          <IonCardContent>
            <div className="grid grid-cols-4 gap-x-4">
              {elevatorInfo?.pictures?.length > 0
                ? elevatorInfo.pictures
                    .slice(0, 4)
                    .map((img) => (
                      <ImageWithLoader
                        key={img}
                        className={"object-cover h-48"}
                        src={img}
                      />
                    ))
                : defaultUniImages
                    .slice(0, 4)
                    .map((img) => (
                      <ImageWithLoader
                        key={img.small}
                        className={"object-cover h-48"}
                        src={img.full}
                        alt={img.alts}
                      />
                    ))}
            </div>
            <div className="mt-4">
              <IonItem>
                <IonText color="dark">
                  <IonCardTitle>{elevatorInfo.name}</IonCardTitle>
                </IonText>
              </IonItem>
              <IonItemDivider />
              <Row
                className="ion-no-padding gap-1 items-center h-fit mt-2"
                lines="none"
              >
                <IonIcon
                  className="ion-icon leading-none mt-0 text-primar text-lg"
                  icon={location}
                />
                <IonText className="text-sm leading-none m-0 h-fit ion-no-padding font-semibold text-gray-600">
                  {formattedAddress}
                </IonText>
              </Row>
              <Row className="mt-4">
                <IonText className="text-[#55D283] font-semibold">
                  Own Type: {elevatorInfo.ownType}
                </IonText>
              </Row>
              <Row className="mt-4 font-semibold">
                <IonText className="text-blue-600 font-semibold">
                  Tags: {elevatorInfo?.tags?.join(", ")}
                </IonText>
              </Row>

              <Row className="mt-4 font-semibold items-center space-x-2 ">
                <IonIcon
                  className="ion-icon text-primar text-lg"
                  icon={schoolOutline}
                />
                <Col className="p-0">
                  <IonText className="text-red-600 font-semibold">
                    Graduate Application Fee: $
                    {studentCharges?.graduateApplicationFee ?? "N/A"}
                  </IonText>
                </Col>
                <Col className="p-0">
                  <IonText className="text-blue-600 font-semibold">
                    Undergradutate Application Fee: $
                    {studentCharges?.undergraduateApplicationFee ?? "N/A"} 📚
                  </IonText>
                </Col>
              </Row>

              <Row className="mt-4 text-green-600">
                <Col>
                  {studentCharges?.graduate?.inState && (
                    <IonText className=" font-semibold">
                      Gradutate In-State Tuition: $
                      {studentCharges?.graduate?.inState?.tuition ?? "N/a"}
                    </IonText>
                  )}
                </Col>
                <Col>
                  {studentCharges?.graduate?.outOfState && (
                    <IonText className=" font-semibold">
                      Gradutate Out-State Tuition: $
                      {studentCharges?.graduate?.outOfState?.tuition ?? "N/a"}
                    </IonText>
                  )}
                </Col>
              </Row>
              <Row className="text-yellow-500">
                <Col>
                  {studentCharges?.undergraduate?.inState && (
                    <IonText className=" font-semibold">
                      Undergradutate In-State Tuition: $
                      {studentCharges?.undergraduate?.inState?.tuition ?? "N/a"}
                    </IonText>
                  )}
                </Col>
                <Col>
                  {studentCharges?.undergraduate?.outOfState && (
                    <IonText className=" font-semibold">
                      Undergradutate Out-State Tuition: $
                      {studentCharges?.undergraduate?.outOfState?.tuition ??
                        "N/a"}
                    </IonText>
                  )}
                </Col>
              </Row>
            </div>
          </IonCardContent>
        </Link>
      </Grid>
    </Card>
  )
}

const SuggestedSpace = ({ data, title, type }) => {
  return (
    <Card className="ion-no-margin">
      <IonCardHeader>
        <h4 className="text-lg text-black font-medium">{title}</h4>
      </IonCardHeader>

      <div className="grid grid-cols-2 ">
        {data.map((space) => (
          <div
            key={space._id}
            style={{
              width: "100%",
              marginTop: "10px"
              // borderTop: "1px solid #e0e0e0"
            }}
            className="max-md:border-none  "
          >
            <Card className="border h-full">
              <IonCardHeader className="capitalize line-clamp-1">
                {space.name}
              </IonCardHeader>
              <IonCardContent>
                <div>
                  <img className="object-cover " src={space.image} alt="" />
                </div>

                <p className="pt-3 line-clamp-3">{space.description}</p>
                <Link to={`/${type}/${space.name}`}>
                  <Button
                    type="button"
                    className="mt-4 hover:scale-[1.02] transition-all ease-linear"
                    fill="outline"
                    expand="block"
                  >
                    View
                  </Button>
                </Link>
              </IonCardContent>
            </Card>
          </div>
        ))}
      </div>
    </Card>
  )
}

const InfiniteFeed = ({ allProps, feedType, feedId }) => {
  const { user } = useSelector((state) => state.userProfile)
  const { data: userInfoData } = useQuery(getUserGql, {
    variables: {
      username: user?.username
    },
    context: {
      server: USER_SERVICE_GQL
    }
  })

  const [page, setPage] = useState(0)
  const { data, loading, fetchMore } = useQuery(getNewsFeed, {
    variables: {
      feedQuery: {
        feedType,
        feedId,
        page: 0
      }
    },
    context: { server: USER_SERVICE_GQL }
  })

  const Posts = data?.fetchFeedV2?.data

  if (!Posts && loading) {
    return <FeedSkeleton />
  }

  const loadMore = (e) => {
    setPage((prev) => prev + 1)
    fetchMore({
      variables: {
        feedQuery: {
          page: page + 1,
          feedId,
          feedType
        }
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return {
          ...prev,
          fetchFeedV2: {
            ...prev?.fetchFeedV2,
            data: [
              ...(prev?.fetchFeedV2?.data || []),
              ...(fetchMoreResult?.fetchFeedV2?.data || [])
            ]
          }
        }
      }
    })
    setTimeout(() => {
      e.target.complete()
    }, 1000)
  }

  const events = Posts?.filter(
    (post) =>
      post.type === "event" && post.event !== null && post.event !== undefined
  )?.map((post) => post.event)
  return (
    <div>
      <Event events={events} />

      {Posts?.map((post, index) => {
        const keyBase = `post-${index}`
        return (
          <div className="mt-5" key={post._id || keyBase}>
            {post.type === "post" && (
              <Post
                post={post}
                index={index}
                allProps={allProps}
                feedType={feedType}
                feedId={feedId}
              />
            )}
            {post.type === "university" && (
              <University
                studyLevel={userInfoData?.getUser?.user?.studyLevel}
                post={post}
                key={`university-${keyBase}`}
              />
            )}
            {post.type === "suggestedSpace" && (
              <SuggestedSpace
                data={post?.suggestedSpace?.spaces}
                post={post}
                title={"Suggested Space"}
                key={`suggestedSpace-${keyBase}`}
                type="space"
              />
            )}
            {post.type === "suggestedOrgs" && (
              <SuggestedSpace
                data={post?.suggestedOrgs?.spaces}
                post={post}
                title={"Suggested Orgs"}
                key={`suggestedOrgs-${keyBase}`}
                type="org"
              />
            )}
          </div>
        )
      })}
      <IonInfiniteScroll threshold="50px" onIonInfinite={loadMore}>
        <IonInfiniteScrollContent loadingText="Loading more posts..." />
      </IonInfiniteScroll>
    </div>
  )
}

export default InfiniteFeed
