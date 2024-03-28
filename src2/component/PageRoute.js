import {lazy, Suspense} from "react"
import {Route, Switch} from "react-router"
import { PreLoader } from './custom-components/preloader'

 


const HomePage = lazy(() => import("../pages/home"))
const PageNotFound = lazy(() => import("./PageNotFound"))

 
 
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
