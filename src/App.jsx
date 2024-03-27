import { useEffect, useState } from "react"
import { IonApp, IonPage, IonRouterOutlet, setupIonicReact } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "./store/store"
import { Provider } from "react-redux"
import "@ionic/react/css/core.css"
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"
import Nav from "./component/NavBar"
import { PageRoute } from "./component/PageRoute"
import MobileNav from "./component/MobileNav"
import { getUserProfile } from "./store/action/userProfile"
import jwtDecode from "jwt-decode"
import appProps from "./appProps"
import ReactGA from "react-ga4"
import { clarity } from "react-microsoft-clarity"

/* Theme variables */

const TrackingId = "G-KDJCCKHWYC"
const ClarityId = "lc6yzoxipb"
ReactGA.initialize(TrackingId)
clarity.init(ClarityId)
setupIonicReact()

const DesktopView = ({ allProps }) => {
  return (
    <div>
      <Nav allProps={allProps} />
      <IonRouterOutlet style={{ marginTop: "65px" }}>
        <PageRoute allProps={allProps} />
      </IonRouterOutlet>
    </div>
  )
}

// src/components/organisms/MobileView.js
const MobileView = ({ allProps }) => {
  return <MobileNav allProps={allProps} />
}

const App = () => {
  const allProps = appProps(),
    { accessToken, refreshToken, width, setCreateAPostPopUp, dispatch } =
      allProps

  useEffect(() => {
    if (accessToken) {
      const decode = jwtDecode(accessToken)
      dispatch(
        getUserProfile({ user: { ...decode }, loggedIn: Boolean(decode) })
      )
    }
  }, [refreshToken, accessToken])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <IonApp>
          <IonPage className="text-black">
            <IonReactRouter>
              {width >= 768 && <DesktopView allProps={allProps} />}
              {width < 768 && (
                <MobileView
                  allProps={allProps}
                  setCreateAPostPopUp={setCreateAPostPopUp}
                />
              )}
            </IonReactRouter>
          </IonPage>
        </IonApp>
      </PersistGate>
    </Provider>
  )
}

export default App
