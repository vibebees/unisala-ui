import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "./datasource/store/store"
import { useDispatch, Provider, useSelector } from "react-redux"
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import appProps from "./appProps"

/* Theme variables */
import './theme/variables.css';
import { PageRoute } from './navigation/PageRoute';

setupIonicReact();

const App: React.FC = () => {
  const allProps = appProps(),
    { accessToken, refreshToken, width, setCreateAPostPopUp, dispatch } =
      allProps

  return ((
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            {/* <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route> */}
            <PageRoute allProps={allProps} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </PersistGate>
    </Provider >
  ))
}

export default App;
