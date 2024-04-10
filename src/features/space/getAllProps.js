import unisalaImg from "assets/unisala-intro.png"
import useDocTitle from "hooks/useDocTitile"
import { personCircle } from "ionicons/icons"
import { useState } from "react"
import { useHistory, useParams } from "react-router"
import { screenGreaterThan1000 } from "./screens.greater.1000"
import { screenLessThan768 } from "./screens.lessThan768"
import { screensMoreThan768 } from "./screens.moreThan768"

export const getAllProps = ({
  user = {},
  topSpaceData = {},
  loggedIn = false,
  profileData = {},
  data = {},
  loading = true
}) => {
  useDocTitle("Unisala")


  const { getTopActiveSpaces } = topSpaceData || {},
    [showTopScrollbtn, setShowTopScrollbtn] = useState(false),
    history = useHistory(),
    [width, setWidth] = useState(window.innerWidth),
    handleResize = () => {
      const { innerWidth } = window
      if (width !== innerWidth) {
        setWidth(innerWidth)
      }
    },
    [activeProfile, setActiveProfile] = useState(false),
    [activeTab, setActiveTab] = useState(0),
    views = {
      greaterThan1000: screenGreaterThan1000({
        title: "Top Spaces",
        topSpaces: getTopActiveSpaces?.spaceCategory
      }),
      greaterThan768: screensMoreThan768({
        activeTab,
        setActiveTab,
        unisalaImg,
        profileData,
        loggedIn
      }),
      lessThan768: screenLessThan768({
        setActiveProfile,
        personCircle,
        activeProfile,
        loggedIn,
        username: user.username
      })
    },
    [createAPostPopUp, setCreateAPostPopUp] = useState(false),
    [verfiyAPostPopUp, setVerifyAPostPopUp] = useState(false),
    params = useParams(),
    searchSpaceCategory = data?.searchSpaceCategory || {},
    { data: spaceCategory } = searchSpaceCategory,
    spaceId = spaceCategory?._id,
    parentId = spaceCategory?.parentId // this could be null as the current space could be parent in itself
  let tags = []
  const configSegment = {
      options: [
        {
          name: "Feed",
          icon: "home",
          nav: "feed"
        },
        {
          name: "Org",
          icon: "people",
          nav: "org&mem=members"
        },
        {
          name: "Apply",
          icon: "clipboard",
          nav: "apply"
        },
        {
          name: "History",
          icon: "time",
          nav: "history"
        },
        {
          name: "Invite",
          icon: "people",
          nav: "invite"
        }
      ],
      onClick: (event, nav) => {
        history.push({ search: `?address=${nav}` })
      },
      scrollable: false
    },
    [tab, setTab] = useState("feed")

  return {
    unisalaImg,
    activeTab,
    setActiveTab,
    createAPostPopUp,
    setCreateAPostPopUp,
    verfiyAPostPopUp,
    setVerifyAPostPopUp,
    width,
    activeProfile,
    setActiveProfile,
    user,
    loggedIn,
    spaceId,
    views,
    handleResize,
    showTopScrollbtn,
    setShowTopScrollbtn,
    profileData,
    params,
    parentId,
    topSpaceData,
    data,
    loading,
    searchSpaceCategory,
    spaceCategory,
    tags,
    configSegment,
    tab,
    setTab
  }
}

