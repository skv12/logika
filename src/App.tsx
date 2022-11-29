import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
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
import AuthContext from "./Auth";
setupIonicReact();

const App: React.FC = () => {
  const { authValues } = React.useContext(AuthContext);
  return (
    <IonApp>
      {!authValues.loggedIn ? (
        <IonReactRouter>
          <Route path="/login" component={Login} />
          <Redirect exact from="/" to="/login" />
        </IonReactRouter>
      ) : (
        <IonReactRouter>
          <TabNavigator />
          <Redirect exact from="/" to="/tabs" />
        </IonReactRouter>
      )}
    </IonApp>
  );
};

export default App;
