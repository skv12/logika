import React, { useRef } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import StockActivity from "../pages/StockActivity";
import HistoryActivity from "../pages/HistoryActivity";
import Tab4 from "../pages/Tab4";
import AboutActivity from "../pages/AboutActivity";
import "./TabNavigator.scss";
import aboutIcon from "../res/apps.svg";
import historyIcon from "../res/refresh.svg";
import remainsIcon from "../res/graphics.svg";
import statsIcon from "../res/zip.svg";
import StatsActivity from "../pages/StatsActivity";
const TabNavigator: React.FC = () => {
  const routerRef = useRef<HTMLIonRouterOutletElement | null>(null);

  return (
    <IonTabs>
      <IonRouterOutlet ref={routerRef}>
        <Redirect exact={true} from={"/tabs"} to={"/tabs/stock"}></Redirect>
        <Redirect exact from="/" to="/tabs/stock" />

        <Route path="/tabs/stock" component={StockActivity} exact={true} />
        <Route path="/tabs/stats" component={StatsActivity} exact={true} />
        <Route path="/tabs/history" component={HistoryActivity} exact={true} />
        <Route path="/tabs/tab4" component={Tab4} exact={true} />
        <Route
          path="/tabs/about"
          component={AboutActivity}
          exact={true}
        ></Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom" color="tertiary">
        <IonTabButton tab="stock" href="/tabs/stock">
          <IonIcon icon={remainsIcon} />
          <IonLabel>Остатки</IonLabel>
        </IonTabButton>
        <IonTabButton tab="stats" href="/tabs/stats">
          <IonIcon icon={statsIcon} />
          <IonLabel>Продажи</IonLabel>
        </IonTabButton>

        <IonTabButton tab="history" href="/tabs/history">
          <IonIcon icon={historyIcon} />
          <IonLabel>История</IonLabel>
        </IonTabButton>
        {/* <IonTabButton tab="tab4" href="/tabs/tab4" class = { cl4 }>
              <IonIcon icon={bicycleOutline} />
              <IonLabel>Доставка</IonLabel>
            </IonTabButton> */}
        <IonTabButton tab="about" href="/tabs/about">
          <IonIcon src={aboutIcon} />
          <IonLabel>О программе</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabNavigator;
