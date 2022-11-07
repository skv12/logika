import React, { useRef, useState } from "react";
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
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  barChartOutline,
  listOutline,
  serverOutline,
  bicycleOutline,
  informationCircleOutline,
} from "ionicons/icons";
import Tab1 from "../pages/Tab1";
import Tab2 from "../pages/Tab2";
import Tab3 from "../pages/Tab3";
import Tab4 from "../pages/Tab4";
import Login from "../pages/Login";

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
import "../theme/variables.css";
import { getStores, Store } from "../pages/Store";
import AboutActivity from "../pages/AboutActivity";
const TabNavigator: React.FC = () => {
  const [cl1, setCl1] = useState("");
  const [cl2, setCl2] = useState("");
  const [cl3, setCl3] = useState("");
  const [cl4, setCl4] = useState("");
  const [cl5, setCl5] = useState("");

  Store.subscribe_auth(() => {
    let user = Store.getState().user;
    console.log("auth - 1");

    getStores();

    setCl1("");
    setCl3("");
    setCl2("");
    setCl4("");
    if (user.role === "Кассир") {
      setCl1("hidden");
    }

    if (user.role === "Доставка") {
      setCl1("hidden");
      setCl3("hidden");
    }
    if (!user.auth) {
      setCl1("hidden");
      setCl3("hidden");
      setCl2("hidden");
      setCl4("hidden");
    }
  });
  const routerRef = useRef<HTMLIonRouterOutletElement | null>(null);
  return (
    <IonTabs>
      <IonRouterOutlet ref={routerRef}>
        <Redirect exact={true} from={"/tabs"} to={"/tabs/tab1"}></Redirect>
        <Route path="/tabs/tab1" component={Tab1} exact={true} />
        <Route path="/tabs/tab2" component={Tab2} exact={true} />
        <Route path="/tabs/tab3" component={Tab3} exact={true} />
        {/* <Route path="/tab4" component={Tab4} exact={true} />           */}
        <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
        <Route
          path="/tabs/about"
          component={AboutActivity}
          exact={true}
        ></Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/tab1" class={cl1}>
          <IonIcon icon={barChartOutline} />
          <IonLabel>Продажи</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/tab2" class={cl2}>
          <IonIcon icon={listOutline} />
          <IonLabel>Остатки</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/tab3" class={cl3}>
          <IonIcon icon={serverOutline} />
          <IonLabel>История</IonLabel>
        </IonTabButton>
        {/* <IonTabButton tab="tab4" href="/tab4" class = { cl4 }>
              <IonIcon icon={bicycleOutline} />
              <IonLabel>Доставка</IonLabel>
            </IonTabButton> */}
        <IonTabButton tab="about" href="/tabs/about" class={cl5}>
          <IonIcon icon={informationCircleOutline} />
          <IonLabel>О программе</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabNavigator;
