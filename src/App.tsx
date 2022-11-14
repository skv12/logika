import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  useIonViewWillEnter,
  withIonLifeCycle,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  barChartOutline,
  listOutline,
  serverOutline,
  bicycleOutline,
  informationCircleOutline,
} from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import Tab4 from "./pages/Tab4";
import Login from "./pages/Login";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import TabNavigator from "./routers/TabNavigator";
import { Auth } from "./data/DataApi";
import { Store } from "./pages/Store";
setupIonicReact();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(Store.getState().user.auth);
  return (
    <IonApp>
      <IonReactRouter>
        <Route
          path="/tabs"
          render={(props) => {
            return isLoggedIn ? <TabNavigator /> : <Login />;
          }}
        />
        <Route path="/login" component={Login} />
        <Redirect exact from="/" to="/login" />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
