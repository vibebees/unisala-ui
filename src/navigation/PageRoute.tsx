import React from "react";
import { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router";
import { ProtectedRoute } from "../utils/lib/protectedRoute";
import { PreLoader } from "../components/packages/preloader";
import { useSelector } from "react-redux";
import { getCache } from "../utils/cache";
import { Chats } from "@features/messages/whatsapp/Chats";

const ProfilePage = lazy(() => import("../pages/userProfile"));
const Messages = lazy(() => import("../pages/message"));

const MyNetwork = lazy(() => import("../pages/network"));
const Notifications = lazy(() => import("../pages/notification"));
// Assuming StudyAbroadRoadmapInput is a component, if it's not, you can't lazy load it
// const StudyAbroadRoadmapInput = lazy(() => import("features/roadmap/template"))
const Discover = lazy(() => import("../pages/discover"));
const SpacePage = lazy(() => import("../pages/space"));
const Org = lazy(() => import("../pages/org"));

const UniversityPage = lazy(() => import("../pages/university"));
const AuthPage = lazy(() => import("../pages/auth"));
const StudyAbroadRoadmap = lazy(() => import("../pages/roadmap"));

const FeedPage = lazy(() => import("../pages/standard"));

const ThreadDetail = lazy(() => import("../pages/thread.detail"));
const PageNotFound = lazy(() => import("./PageNotFound"));
const LandingPage = lazy(() => import("../pages/landingPage"));
const Standard = lazy(() => import("../pages/standard"));
const HomePage = lazy(() => import("../pages/Home"));

const messagingRoutes = () => (
  // <>
  <ProtectedRoute></ProtectedRoute>
  // </>
);
const networkRoutes = () => <ProtectedRoute></ProtectedRoute>;
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

export const PageRoute = () => {
  const authenticated = true;
  return (
    <Suspense fallback={<PreLoader />}>
      <Route path="/login" exact>
        <AuthPage />
      </Route>
      <Route path="/feed" exact>
        {authenticated ? <HomePage /> : <Redirect to="/" />}
      </Route>
      <Route path="/" exact>
          <LandingPage />
      </Route>
      {/* Protected routes example */}
      <Route path="/profile" exact>
        {authenticated ? <ProfilePage /> : <Redirect to="/login" />}
      </Route>
      <Route path="/standard" exact>
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


      {/* <Route path="/space" exact></Route> */}
      {/* <Route path="/space/:category" exact>
        <SpacePage />
      </Route> */}

      <Route exact path="/university/:id">
        <UniversityPage />
      </Route>

      <Route path="/mynetwork" exact>
        <MyNetwork />
      </Route>
      <Route path="/messages" exact>
        <Messages />
      </Route>
      <Route path="/messages/:friendUserName" exact>
        <Messages />
      </Route>

      <Route path="/landingPage" exact>
        <LandingPage />
      </Route>

      <Route exact path="/home" component={LandingPage} />
      {/* <Route path="/org/:category" exact>
        <Org />
      </Route> */}
      {/* <Route path="/org/:category/:admin/:requestor/:orgId/:role">
        <Org />
      </Route> */}
      <Route component={PageNotFound} />
    </Suspense>
  );
};
