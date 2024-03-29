import React from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRow,
  IonSearchbar,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages2/Tab1';
import Tab2 from './pages2/Tab2';
import Tab3 from './pages2/Tab3';

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

/* Theme variables */
import './theme/variables.css';
import { NavBar, } from './navigation';
import { SearchBar } from './components/packages/searchBox';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <NavBar />
    </IonReactRouter>
  </IonApp>
);

export default App;
