import React, { useEffect, useRef, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonContent,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
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
import { getStores, Store } from "../pages/Store";
import AboutActivity from "../pages/AboutActivity";
import "./TabNavigator.scss";
import aboutIcon from "../res/apps.svg";
import historyIcon from "../res/refresh.svg";
import remainsIcon from "../res/graphics.svg";
import statsIcon from "../res/zip.svg";
const TabNavigator: React.FC = () => {
  const [cl1, setCl1] = useState("");
  const [cl2, setCl2] = useState("");
  const [cl3, setCl3] = useState("");
  const [cl4, setCl4] = useState("");
  const [cl5, setCl5] = useState("");
  const routerRef = useRef<HTMLIonRouterOutletElement | null>(null);
  useEffect(()=>{
    getStores();
  })
  return (
    <IonContent>
      <IonTabs>
        <IonRouterOutlet ref={routerRef}>
          <Redirect exact={true} from={"/tabs"} to={"/tabs/tab1"}></Redirect>
          <Redirect exact from="/" to="/tabs/tab1" />
          <Route path="/tabs/tab1" component={Tab1} exact={true} />
          <Route path="/tabs/tab2" component={Tab2} exact={true} />
          <Route path="/tabs/tab3" component={Tab3} exact={true} />
          <Route path="/tabs/tab4" component={Tab4} exact={true} />          
          <Route
            path="/tabs/about"
            component={AboutActivity}
            exact={true}
          ></Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color="tertiary">
          <IonTabButton tab="tab1" href="/tabs/tab1" class={cl1}>
            <IonIcon icon={statsIcon} />
            <IonLabel>Продажи</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tabs/tab2" class={cl2}>
            <IonIcon icon={remainsIcon} />
            <IonLabel>Остатки</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tabs/tab3" class={cl3}>
            <IonIcon icon={historyIcon} />
            <IonLabel>История</IonLabel>
          </IonTabButton>
          {/* <IonTabButton tab="tab4" href="/tabs/tab4" class = { cl4 }>
              <IonIcon icon={bicycleOutline} />
              <IonLabel>Доставка</IonLabel>
            </IonTabButton> */}
          <IonTabButton tab="about" href="/tabs/about" class={cl5}>
            <IonIcon src={aboutIcon} />
            <IonLabel>О программе</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonContent>
  );
};

export default TabNavigator;
