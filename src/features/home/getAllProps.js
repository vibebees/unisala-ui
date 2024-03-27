import { useState } from "react"
import unisalaImg from "assets/unisala-intro.png"
import {
  screenGreaterThan1000,
  screenLessThan768,
  screensMoreThan768
} from "./helper.func"
import {
  book,
  documentSharp,
  helpCircleSharp,
  personCircle,
  schoolSharp,
  starSharp
} from "ionicons/icons"
import { useQuery } from "@apollo/client"
import { useHistory, useLocation } from "react-router"
import ProfilePop from "component/profilePop"
import { USER_SERVICE_GQL } from "servers/types"
import { GetTopActiveSpaces, GetTopOrgs } from "graphql/user"
import useWindowWidth from "hooks/useWindowWidth"

export const getAllPropsHome = ({ user, loggedIn, userInfo, propsall }) => {
  const [activeProfile, setActiveProfile] = useState({ profile: false }),
    [activeTab, setActiveTab] = useState(0),
    [newUser, setNewUser] = useState(localStorage.getItem("newUser") || false),
    { data: topSpaceData } = useQuery(GetTopActiveSpaces, {
      variables: { limit: 4 },
      context: { server: USER_SERVICE_GQL }
    }),
    { data: topOrgData } = useQuery(GetTopOrgs, {
      context: { server: USER_SERVICE_GQL }
    }),
    { getTopActiveSpaces } = topSpaceData || {},
    { getTopOrgSpace } = topOrgData || {},
    views = {
      greaterThan1000: screenGreaterThan1000(),
      greaterThan768: screensMoreThan768({
        activeTab,
        setActiveTab,
        unisalaImg,
        loggedIn,
        topSpaces: getTopActiveSpaces?.spaceCategory,
        topOrgs: getTopOrgSpace
      }),
      lessThan768: screenLessThan768({
        setActiveProfile,
        personCircle,
        activeProfile,
        loggedIn,
        username: user.username,
        ProfilePop,
        propsall
      })
    },
    [createAPostPopUp, setCreateAPostPopUp] = useState(false),
    [verfiyAPostPopUp, setVerifyAPostPopUp] = useState(false),
    [page, setPage] = useState(0),
    width = useWindowWidth(),
    history = useHistory(),
    location = useLocation(),
    [unitId, setUnitId] = useState(
      userInfo?.getUser?.user?.unitId || undefined
    ),
    generateUserGuide = (userProfile, schoolData) => {
      const interestedSubjects = userProfile?.interestedSubjects || []
      const interestedUni = userProfile?.interestedUni || []
      const userStatus = userProfile?.userStatus || ""

      let userGuide = []

      // If user has subjects of interest.
      // if (interestedUni.length > 0) {
      //   userGuide.push({
      //     name: schoolData?.name,
      //     level: "Review My Universtiy",
      //     icon: schoolSharp, // Make sure to have the appropriate icons imported
      //     iconSize: 7,
      //     routing: true,
      //     link: `/university/${schoolData?.name}`
      //   })
      // }

      // If user has subjects of interest.
      if (interestedSubjects.length > 0) {
        userGuide.push({
          name: "Explore Topics",
          level: "Interested Subjects",
          icon: book, // Make sure to have the appropriate icons imported
          iconSize: 7,
          routing: true,
          link: `/space`
        })
      }

      // If user is applying but hasn't shown interest in any particular university.
      if (userStatus === "applying") {
        userGuide.push({
          name: "Explore Universities",
          level: "Find Your Fit",
          icon: schoolSharp,
          iconSize: 7,
          routing: true,
          link: `/search?tab=uni`
        })
      }

      // Suggesting interview prep session for users either "applying" or "actively looking".
      if (["applying", "looking"].includes(userStatus) > 0) {
        userGuide.push({
          name: "Interview Prep",
          level: "Prepare for your Interviews",
          icon: helpCircleSharp,
          iconSize: 7,
          routing: true,
          key: "interviewPrep",
          link: `https://docs.google.com/forms/d/e/1FAIpQLSee_bp9nUOb3fymt0qZSUUseIgdYnoh5php-mUb_iqmS-Rwqw/viewform`
        })

        userGuide.push({
          name: "Express I20",
          level: "Processing I20",
          icon: documentSharp,
          iconSize: 7,
          routing: true,
          key: "interviewPrep",
          link: `https://forms.gle/iN2brCZ3qGuKzogM6`
        })
      }

      // Suggesting review/rating for users either "graduated" or "studying".
      // if (userStatus === "graduated" || userStatus === "studying") {
      //   userGuide.push({
      //     name: "Share Your Experience",
      //     level: "Review and Rate your University",
      //     icon: starSharp, // Use an appropriate icon for reviews/ratings
      //     iconSize: 5,
      //     routing: true,
      //     link: `/review-university` // Point to the appropriate review page in your application
      //   })
      // }

      return userGuide
    }

  return {
    unisalaImg,
    activeTab,
    setActiveTab,
    createAPostPopUp,
    setCreateAPostPopUp,
    verfiyAPostPopUp,
    setVerifyAPostPopUp,
    width,
    newUser,
    setNewUser,
    activeProfile,
    setActiveProfile,
    user,
    loggedIn,
    GetTopActiveSpaces,
    views,
    page,
    setPage,
    history,
    location,
    userInfo,
    generateUserGuide,
    unitId,
    setUnitId
  }
}
