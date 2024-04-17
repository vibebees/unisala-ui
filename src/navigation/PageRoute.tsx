import React from "react"
import { lazy, Suspense } from "react"
import { Redirect, Route, Switch } from "react-router"
import { ProtectedRoute } from "../utils/lib/protectedRoute"
import { PreLoader } from "../components/packages/preloader"
import { useSelector } from "react-redux"
import { getCache } from "../utils/cache"

// import SpaceIndex from "features/org/SpaceIndex/SpaceIndex"

const ProfilePage = lazy(() => import("../pages/userProfile"))
const Messages = lazy(() => import("../pages/message"))
const MyNetwork = lazy(() => import("../pages/network"))
const Notifications = lazy(() => import("../pages/notification"))
// Assuming StudyAbroadRoadmapInput is a component, if it's not, you can't lazy load it
// const StudyAbroadRoadmapInput = lazy(() => import("features/roadmap/template"))
const Discover = lazy(() => import("../pages/discover"))
const SpacePage = lazy(() => import("../pages/space"))
const Org = lazy(() => import("../pages/org"))

const UniversityPage = lazy(() => import("../pages/university"))
const AuthPage = lazy(() => import("../pages/auth"))
const StudyAbroadRoadmap = lazy(() => import("../pages/roadmap"))

const FeedPage = lazy(() => import("../pages/standard"))

const ThreadDetail = lazy(() => import("../pages/thread.detail"))
const PageNotFound = lazy(() => import("./PageNotFound"))
const LandingPage = lazy(() => import("../pages/landingPage"))
const Standard = lazy(() => import("../pages/standard"))
const HomePage = lazy(() => import("../pages/home"))


const messagingRoutes = () => (
  // <>
  <ProtectedRoute>

  </ProtectedRoute>
  // </>
)
const networkRoutes = () => (
  <ProtectedRoute>

  </ProtectedRoute>
)
// const spaceRoutes = () => (
//   <>
//     <ProtectedRoute>
//       <Switch>
//         <Route path="/space" exact>
//           {/* <SpaceIndex /> */}
//         </Route>
//         <Route path="/space/:category" exact>
//           <SpacePage />
//         </Route>
//       </Switch>
//     </ProtectedRoute>
//   </>
// )

const orgRoutes = () => (
  <>
    <Switch>
      {/* exact is important here for /org/:category/:admin/:requestor/:orgId/:role*/}

    </Switch>
  </>
)

// const universityRoutes = () => (
// <>

//     </>
// )
export const PageRoute = ({ allProps }) => {
  const test = useSelector((state) => state?.userProfile),
    authenticated = getCache('refreshToken') ? true : false;
  return (
    <Suspense fallback={<PreLoader />}>
      <Switch>
        <Route exact path="/">
          {authenticated ? <Redirect to="/feed" /> : <LandingPage />}
        </Route>
        <Route path="/feed">
          {authenticated ? <HomePage /> : <Redirect to="/" />}
        </Route>
        <Route path="/home">
          {authenticated ? <HomePage /> : <Redirect to="/" />}
        </Route>
        {/* Protected routes example */}
        <Route path="/profile">
          {authenticated
            ? <ProfilePage />
            : <Redirect to="/login" />}
        </Route>
        <Route path="/standard">
          <Standard />
        </Route>

        <Route exact path="/thread/:id">
          <ThreadDetail />
        </Route>


        <Route path="/@/:username" exact>
          <ProfilePage />
        </Route>

        <Route path="/search" exact>
          <Discover />
        </Route>

        <Route path="/register" exact>
          <AuthPage allProps={{ ...allProps, routeState: "signup" }} />
        </Route>

        <Route path="/login" exact>
          <AuthPage allProps={{ ...allProps, routeState: "signin" }} />
        </Route>
        <Route path="/space" exact>
          {/* <SpaceIndex /> */}
        </Route>
        <Route path="/space/:category" exact>
          <SpacePage />
        </Route>

        <Route exact path="/university/:id">
          <UniversityPage />
        </Route>
        <Route path="/messages" exact>
          <Messages />
        </Route>
        <Route path="/messages/:username" exact>
          <Messages />
        </Route>
        <Route path="/mynetwork" exact>
          <MyNetwork />
        </Route>
        <Route path="/org/:category" exact>
          <Org />
        </Route>
        <Route path="/org/:category/:admin/:requestor/:orgId/:role" >
          <Org />
        </Route>


        <Route path="/messages" exact>
          <Messages />
        </Route>
        <Route path="/messages/:username" exact>
          <Messages />
        </Route>


        {/* More routes */}
        {/* Fallback route for 404 Not Found */}
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Suspense>
  )

}