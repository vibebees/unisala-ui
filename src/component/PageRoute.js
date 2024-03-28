import {lazy, Suspense} from "react"
import {Route, Switch} from "react-router"

import SpaceIndex from "../features/org/SpaceIndex/SpaceIndex"
import ProtectedRoute from "../utils/lib/protectedRoute"
import PreLoader from "./preloader"

const ProfilePage = lazy(() => import("../pages/user.profile"))
const Messages = lazy(() => import("../pages/message"))
const MyNetwork = lazy(() => import("../pages/network"))
const Notifications = lazy(() => import("../pages/notification"))
// Assuming StudyAbroadRoadmapInput is a component, if it's not, you can't lazy load it
const StudyAbroadRoadmapInput = lazy(() => import("../features/roadmap/template"))
const Search = lazy(() => import("../pages/search"))
const SpacePage = lazy(() => import("../pages/space"))
const Org = lazy(() => import("../pages/org"))

const UniversityPage = lazy(() => import("../features/university/index"))
const AuthPage = lazy(() => import("../pages/auth"))
const StudyAbroadRoadmap = lazy(() => import("../pages/roadmap"))

const HomePage = lazy(() => import("../pages/home"))
const ThreadDetail = lazy(() => import("../pages/thread.detail"))
const PageNotFound = lazy(() => import("./PageNotFound"))

const messagingRoutes = () => (
  <>
    <ProtectedRoute>
      <Route path="/messages" exact>
        <Messages />
      </Route>
      <Route path="/messages/:username" exact>
        <Messages />
      </Route>
    </ProtectedRoute>
  </>
)
const spaceRoutes = () => (
  <>
    <ProtectedRoute>
      <Switch>
        <Route path="/space" exact>
          <SpaceIndex />
        </Route>
        <Route path="/space/:category" exact>
          <SpacePage />
        </Route>
      </Switch>
    </ProtectedRoute>
  </>
)

const orgRoutes = () => (
  <>
    <Switch>
       {/* exact is important here for /org/:category/:admin/:requestor/:orgId/:role*/}
      <Route path="/org/:category" exact>
        <Org />
      </Route>
      <Route path="/org/:category/:admin/:requestor/:orgId/:role" >
        <Org />
      </Route>
    </Switch>
  </>
)

export const PageRoute = ({ allProps }) => (
  <Switch>
    <Suspense fallback={<PreLoader />}>
      {/* <Route path="/roadmap" exact>
        <StudyAbroadRoadmap />
      </Route> */}
      {/* <Route exact path="/thread/:id">
        <ThreadDetail />
      </Route>

      <Route path="/@/:username" exact>
        <ProfilePage />
      </Route>

      <Route exact path="/university/:id">
        <UniversityPage />
      </Route> */}

      {/* {messagingRoutes()}
      {spaceRoutes()}
      {orgRoutes()} */}
      {/* <Route path="/mynetwork" exact>
        <ProtectedRoute>
          <MyNetwork />
        </ProtectedRoute>
      </Route>

      <Route path="/notifications" exact>
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      </Route>

      <Route path="/register" exact>
        <AuthPage allProps={{ ...allProps, routeState: "signup" }} />
      </Route>
      <Route path="/search" exact>
        <Search />
      </Route>

      <Route path="/login" exact>
        <AuthPage allProps={{ ...allProps, routeState: "signin" }} />
      </Route>

      <Route exact path="/home">
        <HomePage />
      </Route> */}

      <Route exact path="/">
        <HomePage propsall={allProps} />
      </Route>

      <Route path="*" exact>
        <PageNotFound />
      </Route>
    </Suspense>
  </Switch>
)
