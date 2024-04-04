import React from "react"
import { useEffect, useState } from "react"
import { useHistory, useLocation, useParams } from "react-router"
import {
  Content,
  Grid,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle
} from "../../components/defaults"
import ProfileHeader from "./profileHeader"
import ProfileBody from "./profileBody"
import Threads from "./threads"
import Guestbook from "./guestbook"
import Saved from "./saved"
import { useQuery } from "@apollo/client"
 import useDocTitle from "../../hooks/useDocTitile"
import noResultsFound from "../../assets/no-results.jpg"
import { USER_SERVICE_GQL } from "../../datasource/servers/types"
import { useSelector } from "react-redux"
import { screenGreaterThan1000 } from "../home/helper.func"
import List from "../../components/packages/list"
import { URLgetter, URLupdate } from "../../utils/lib/URLupdate"
import { getUserGql } from "../../datasource/graphql/user"

const ProfilePage = () => {
  const [tab, setTab] = useState(0)
  const { username } = useParams()
  const history = useHistory()
  const { user: loggedInUser } = useSelector((state) => state.userProfile)

  const { data } = useQuery(getUserGql, {
    context: { server: USER_SERVICE_GQL },
    variables: { username: username }
  })
  useDocTitle(username)

  const { getUser } = data || {}

  const myProfile = username === loggedInUser?.username

  const {
    firstName,
    lastName,
    picture,
    coverPicture,
    oneLinerBio,
    location,
    socialLinks,
    about,
    badges,
    education,
    testScore,
    _id,
    doj
  } = getUser?.user || {}

  const profilePic = picture

  const profileHeaderData = {
    _id,
    firstName,
    lastName,
    username,
    profilePic,
    coverPicture,
    oneLinerBio,
    location,
    socialLinks,
    myProfile,
    doj,
    connectionType: getUser?.connectionType
  }


  const profileBodyData = {
    username,
    about,
    badges,
    education,
    testScore,
    myProfile
  }

  const locate = useLocation()

  const tabMap = {
    0: "profile",
    1: "threads",
    2: "list",
    3: "saved",
    4: "roadmap",
    5: "guestbook"
  }

  // this effect is responsible to show the component(target users who probably came by following a link)
  useEffect(() => {
    const query = URLgetter("tab")

    if (!query) {
      const tabURL = URLupdate("tab", "profile")
      history.push({ search: tabURL })
    } else {
      switch (query) {
        case "threads":
          setTab(1)
          break
        case "list":
          setTab(2)
          break
        case "saved":
          setTab(3)
          break
        case "roadmap":
          setTab(4)
          break
        case "guestbook":
          setTab(5)
          break
        default:
          setTab(0)
      }
    }
  }, [])

  // this effect handles tab selections

  useEffect(() => {
    if (tab) {
      const tabURL = URLupdate("tab", tabMap[tab])
      history.push({ search: tabURL })
    }
  }, [tab])

  if (!getUser?.user) {
    return (
      <Content>
        <Card
          style={{ textAlign: "center", marginInline: "auto" }}
          className="max-width-container "
        >
          <img alt="unisala: no results found" src={noResultsFound} />
          <CardHeader>
            <CardTitle>
              Sorry, this page is not available. &#9785;
            </CardTitle>
            <CardSubtitle>
              The link you followed may be broken, or the page may have been
              removed.
            </CardSubtitle>
          </CardHeader>
        </Card>
      </Content>
    )
  }

  return (
    <Content>
      <Grid className="max-width-container max-md:px-0">
        <Row>

          <Col className="w-2/5 max-md:px-0">
            <ProfileHeader tab={tab} setTab={setTab} data={profileHeaderData} />
            {tab === 0 && getUser?.user && (
              <ProfileBody data={profileBodyData} />
            )}
            {tab === 1 && <Threads userId={_id} firstName={firstName} />}
            {tab === 2 && <List userId={_id} />}
            {tab === 3 && <Saved userId={_id} firstName={firstName} />}
            {tab === 5 && <Guestbook userId={_id} firstName={firstName} />}
          </Col>

          {/* {windowWidth >= 1000 && views.greaterThan100} */}
        </Row>
      </Grid>
    </Content>
  )
}

export default ProfilePage
