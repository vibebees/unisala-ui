import { IonContent } from "@ionic/react"
import React, { useEffect, useState, lazy } from "react"
import "./Home.css"
import { useQuery } from "@apollo/client"
import { getUpdatedSchoolInfo } from "graphql/uni"
import { fetchFamousUniversities } from "graphql/user"
import useDocTitle from "hooks/useDocTitile"
import { UNIVERSITY_SERVICE_GQL, USER_SERVICE_GQL } from "servers/types"
import { UnisalaLandingPage } from "./UnisalaIntro"
import { Card, Col, Grid, Row } from "component/ui"
const FloatingButton = lazy(() => import("../../component/FloatingButton"))
const CreateAPostCard = lazy(() => import("../../component/post/template"))
const WelcomeSteps = lazy(() =>
  import("../../component/authentication/Welcome")
)
const InfiniteFeed = lazy(() => import("../../component/feed/Feed"))
const ScrollableCard = lazy(() =>
  import("../../component/ScrollableImageCard/organism/ScrollableCard")
)
const FolderStructure = lazy(() =>
  import("../../component/folderStructure/index")
)

export const Home = ({ allProps }) => {
  useDocTitle("Unisala")
  const {
    width,
    newUser,
    user,
    loggedIn,
    views,
    refetch,
    userInfo = {},
    generateUserGuide
  } = allProps || {}

  const { interestedUni } = userInfo || {}
  const [unitId] = interestedUni || []

  const [userGuide, setUserGuide] = useState([])
  const [userSchoolData, setUserSchoolData] = useState({})

  const { loading: schoolLoading, data: schoolData } = useQuery(
    getUpdatedSchoolInfo(unitId),
    {
      variables: { unitId },
      context: { server: UNIVERSITY_SERVICE_GQL }
    }
  )
  const { data: famousUniversities } = useQuery(fetchFamousUniversities, {
    variables: { limit: 100, page: 0 },
    context: { server: USER_SERVICE_GQL }
  })

  const discoverUni = famousUniversities?.getFamousUniversity

  useEffect(() => {
    const generatedUserGuide = generateUserGuide(
      userInfo,
      schoolData?.getUpdatedSchoolInfo?.elevatorInfo
    )
    setUserGuide(generatedUserGuide)
  }, [schoolData])

  const renderLoggedInView = () => (
    <>
      <div className="mx-12 max-md:mx-2 max-lg:mx-5">
        <CreateAPostCard allProps={allProps} />
        <FolderStructure
          allProps={{
            ...allProps,
            folderName: "",
            data: userGuide,
            popUp: false,
            customHeight: false
          }}
        />

        <Card className=" mt-4 ion-no-padding ion-no-margin">
          <ScrollableCard
            allProps={{
              data: discoverUni,
              className: "similarschoolss"
            }}
          />
        </Card>

        <InfiniteFeed userInfo={user} allProps={allProps} feedType="newsfeed" />
      </div>
    </>
  )

  const renderNewUserView = React.useCallback(() => {
    if (loggedIn && newUser) {
      return <WelcomeSteps allProps={{ ...allProps, refetch }} />
    }
    return null
  }, [loggedIn, newUser])

  return (
    <IonContent color="light">
      <FloatingButton />
      {width < 768 && views.lessThan768}
      <Grid
        style={{
          margin: "auto"
        }}
        className="max-md:px-0"
      >
        <Row
          style={{ justifyContent: "flex-start", margin: "0 auto" }}
          className="max-width-container"
        >
          {width > 768 && views.greaterThan768}
          <Col
            style={{
              maxWidth: "900px",
              margin: "auto",

              overflow: "hidden"
            }}
            className="max-md:px-0 "
          >
            {loggedIn ? renderLoggedInView() : UnisalaLandingPage({ allProps })}
          </Col>
          {width > 1000 && views.greaterThan1000}
          {renderNewUserView()}
        </Row>
      </Grid>
    </IonContent>
  )
}
