import React, { useEffect, useState, lazy } from "react"
import "./Home.css"
import { Content } from "../../components/defaults/index"
import { useQuery } from "@apollo/client"
import { getUpdatedSchoolInfo } from "./../../datasource/graphql/uni"
import { fetchFamousUniversities } from "./../../datasource/graphql/user"
import useDocTitle from "../../hooks/useDocTitile"
import { UNIVERSITY_SERVICE_GQL, USER_SERVICE_GQL } from "./../../datasource/servers/types"
import { Card, Col, Grid, Row } from "../../components/defaults"
const FloatingButton = lazy(() => import("../../components/packages/floatingButton/index"))
const CreateAPostCard = lazy(() => import("../../components/packages/createAPost/template"))

const WelcomeSteps = lazy(() => import("../../components/packages/authentication/Welcome"))
const InfiniteFeed = lazy(() => import("../../components/packages/feed/Feed"))
// const ScrollableCard = lazy(() =>import("../../components/packages/ScrollableImageCard/organism/ScrollableCard"))
const FolderStructure = lazy(() => import("../../components/packages/folderStructure/index"))

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
      <div >
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
        <InfiniteFeed userInfo={user} allProps={allProps} feedType="newsfeed" />
      </div>
  )

  const renderNewUserView = React.useCallback(() => {
    if (loggedIn && newUser) {
      return <WelcomeSteps allProps={{ ...allProps, refetch }} />
    }
    return null
  }, [loggedIn, newUser])

  return (
    <>
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
           {renderLoggedInView()}
          </Col>
          {width > 1000 && views.greaterThan1000}
          {renderNewUserView()}
        </Row>
      </Grid>
    </>
  )
}
