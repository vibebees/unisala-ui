import React, { useEffect, useState, lazy } from "react"
import "./Home.css"
import { Content } from "../../components/defaults/index"
import { useQuery } from "@apollo/client"
import { getUpdatedSchoolInfo } from "./../../datasource/graphql/uni"
import { fetchFamousUniversities } from "./../../datasource/graphql/user"
import useDocTitle from "../../hooks/useDocTitile"
import { UNIVERSITY_SERVICE_GQL, USER_SERVICE_GQL } from "./../../datasource/servers/types"
import { Card, Col, Grid, Row } from "../../components/defaults"
import { useSelector } from "react-redux"
const FloatingButton = lazy(() => import("../../components/packages/floatingButton/index"))
const CreateAPostCard = lazy(() => import("../../components/packages/createAPost/template"))

const WelcomeSteps = lazy(() => import("../../components/packages/authentication/Welcome"))
const InfiniteFeed = lazy(() => import("../../components/packages/feed/Feed"))
// const ScrollableCard = lazy(() =>import("../../components/packages/ScrollableImageCard/organism/ScrollableCard"))
const FolderStructure = lazy(() => import("../../components/packages/folderStructure/index"))
const ScrollableCard = lazy(() => import("../../components/packages/scrollableImageCard/organism/ScrollableCard"))

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

  const { interestedUni } =  useSelector(state => state.userProfile) || {}
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
  const { data: famousUniversities , loading: famousUniversitiesLoading, error} = useQuery(fetchFamousUniversities, {
    variables: { limit: 20, page: 0 },
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

  const Feed = () => (
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
      <Card className=" mt-4 ion-no-padding ion-no-margin">
        <ScrollableCard
          allProps={{
            ...allProps,
            data: discoverUni,
            title: "Discover Universities",
            loading: famousUniversitiesLoading,
            error: error
          }}
        />
      </Card>

      <InfiniteFeed feedType="newsfeed"  />
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
      {renderNewUserView()}
      {Feed()}
    </>
  )
}
