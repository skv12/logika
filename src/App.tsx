import { Redirect, Route } from "react-router-dom";
import React, { Component, useContext, useEffect, useState } from "react";
import { IonApp, setupIonicReact } from "@ionic/react";

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
import { IonReactRouter } from "@ionic/react-router";
import { loadUserData, setIsLoggedIn, setLogin } from "./data/user.actions";
import { connect } from "./api/connect";
import TabNavigator from "./routers/TabNavigator";
import LoginActivity from "./pages/LoginActivity";
import { AppContextProvider } from "./api/AppContext";
import RedirectToLogin from "./components/RedirectToLogin";
setupIonicReact();

interface StateProps {
  darkMode: boolean;
  isLoggedin: boolean;
  loginToken?: string;
}

interface DispatchProps {
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setLogin: typeof setLogin;
}

interface IonicAppProps extends StateProps, DispatchProps {}

const Start: React.FC<IonicAppProps> = ({
  darkMode,
  isLoggedin,
  loginToken,
  setIsLoggedIn,
  setLogin,
  loadUserData,
}) => {
  useEffect(() => {
    loadUserData();
  }, []);
  return (
    <IonApp className={`${darkMode ? "dark-theme" : ""}`}>
      <IonReactRouter>
        <Route path="/login" component={LoginActivity}>
        </Route >
        <Route path="/">
          {isLoggedin ? TabNavigator : <Redirect to="/login" />}
        </Route>
        <Route path="/logout">
          <RedirectToLogin setIsLoggedIn={setIsLoggedIn} />
          <Redirect to="/" />
        </Route>
      </IonReactRouter>
    </IonApp>
  );
};
const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isLoggedin: state.user.isLoggedin,
    loginToken: state.user.loginToken,
  }),
  mapDispatchToProps: { loadUserData, setIsLoggedIn, setLogin },
  component: Start,
});
const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

export default App;
