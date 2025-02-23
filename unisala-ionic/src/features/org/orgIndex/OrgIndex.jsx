import { useQuery } from "@apollo/client"
import { Col, Content, Grid, Row } from  "@components/defaults"
import {
  GenerateSpaceNewsFeed,
  GetOwnSpace,
  GetTopActiveSpaces
} from "graphql/user"
import { personCircle } from "ionicons/icons"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { USER_SERVICE_GQL } from "servers/types"
import UnisalaIntro from "../UnisalaIntro"
import { screenGreaterThan1000 } from "../screens.greater.1000"
import { screenLessThan768 } from "../screens.lessThan768"
import "./Org.css"
import SpaceIndexFeed from "./OrgIndexFeed"
import SpaceIndexLeftBar from "./OrgIndexLeftBar"

const SpaceIndex = () => {
  const { user, loggedIn } = useSelector((store) => store?.userProfile)
  const { data: topSpaceData } = useQuery(GetTopActiveSpaces, {
    variables: { limit: 6 },
    context: { server: USER_SERVICE_GQL }
  })
  const { getTopActiveSpaces } = topSpaceData || {}

  const { data: yourSpaceData } = useQuery(GetOwnSpace, {
    variables: { limit: 100, page: 0, isActive: true },
    context: { server: USER_SERVICE_GQL }
  })
  const { getOwnSpaceCategory } = yourSpaceData || {}
  const { data: spaceNewsFeed } = useQuery(GenerateSpaceNewsFeed, {
    variables: { limit: 100, page: 0 },
    context: { server: USER_SERVICE_GQL }
  })

  const { generateSpaceNewsFeedSystem } = spaceNewsFeed || {}
  const [width, setWidth] = useState(window.innerWidth)
  const [activeProfile, setActiveProfile] = useState(false)

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (width !== window.innerWidth) {
        setWidth(window.innerWidth)
      }
    })
    return () => {
      window.removeEventListener("resize", () => {
        if (width !== window.innerWidth) {
          setWidth(window.innerWidth)
        }
      })
    }
  }, [])

  const views = {
    greaterThan1000: screenGreaterThan1000({
      title: "Top Spaces",
      topSpaces: getTopActiveSpaces?.spaceCategory
    }),
    greaterThan768: SpaceIndexLeftBar({
      user,
      data: getOwnSpaceCategory?.spaceCategory
    }),
    lessThan768: screenLessThan768({
      setActiveProfile,
      personCircle,
      activeProfile,
      loggedIn,
      username: user.username
    })
  }

  return (
    <Content color="light">
      {width < 768 && views.lessThan768}
      <Grid
        style={{
          width: width >= 768 ? "95%" : "100%",
          margin: "auto",
          maxWidth: "1200px"
        }}
      >
        <Row
          style={{
            justifyContent: "flex-start",
            margin: "0 auto"
          }}
          className="max-width-container"
        >
          {width > 768 && views.greaterThan768}
          <Col
            style={{
              maxWidth: "700px",
              margin: "auto",
              minHeight: "calc(90vh)"
            }}
          >
            {loggedIn ? (
              <SpaceIndexFeed posts={generateSpaceNewsFeedSystem?.posts} />
            ) : (
              <UnisalaIntro />
            )}
          </Col>

          <Col className="max-w-max">
            {width > 1000 && views.greaterThan1000}
          </Col>
        </Row>
      </Grid>
    </Content>
  )
}
export default SpaceIndex

