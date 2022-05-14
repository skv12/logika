import {
  IonContent,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";

import MainActivity from "../pages/MainActivity";
import StatsActivity from "../pages/StatsActivity";
import SalesActivity from "../pages/SalesActivity";
import ProfileActivity from "../pages/ProfileActivity";
import {
  personOutline,
  statsChartOutline,
  cartOutline,
  storefrontOutline,
} from "ionicons/icons";
import "./TabNavigator.scss";
import { contexts, getCategories, getItems, getStores } from "../api/dataApi";
import CategoryList from "../components/CategoryList";
import { useEffect } from "react";
import ItemCard from "../components/ItemCard";
let initDone = false;
const TabNavigator: React.FC = () => {
  useEffect(() =>{
    if (!initDone) {
      initDone = true;
      console.log(123);
      getStores();
      getCategories();
      getItems("МаркетХолл", "Розничная");
    }
    else{
      getStores();
      getCategories();
    }
  });
  
  return (
    <IonContent>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/main" component={MainActivity}>
          </Route>
          <Route path="/item" render={() => <ItemCard item={contexts.stores.itemsStore.getItem("ЦБ-00008095")}></ItemCard>}>
          </Route>
          <Route exact path="/main/:code" render={() => <MainActivity category={(contexts.data.appState.currentCategory)}></MainActivity>}/>
          <Route exact path="/stats">
            <StatsActivity />
          </Route>
          <Route exact path="/sales">
            <SalesActivity />
          </Route>
          <Route exact path="/profile">
            <ProfileActivity />
          </Route>
          <Route exact path="/" render={() => <Redirect to="/main" />} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="main" href="/main">
            <IonIcon icon={storefrontOutline} />
            <IonLabel>Склад</IonLabel>
          </IonTabButton>
          <IonTabButton tab="sales" href="/sales">
            <IonIcon icon={cartOutline} />
            <IonLabel>Продажа</IonLabel>
          </IonTabButton>
          <IonTabButton tab="stats" href="/stats">
            <IonIcon icon={statsChartOutline} />
            <IonLabel>Статистика</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={personOutline} />
            <IonLabel>Профиль</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonContent>
  );
};
export default TabNavigator;
