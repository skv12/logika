import {
  IonContent,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route} from "react-router-dom";

import MainActivity from "../pages/MainActivity";
import StatsActivity from "../pages/StatsActivity";
import SalesActivity from "../pages/SalesActivity";
import ProfileActivity from "../pages/ProfileActivity";
import {
  personOutline,
  statsChartOutline,
  cartOutline,
  storefrontOutline,
  scanOutline,
} from "ionicons/icons";
import "./TabNavigator.scss";
import { contexts, getOrders } from "../api/dataApi";
import { useEffect, useRef } from "react";
import ItemCard from "../components/ItemCard";
import OrderCard from "../components/OrderCard";
//import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner';
import { setLoading } from "../data/user.actions";
import ScannerActivity from "../pages/ScannerActivity";
const TabNavigator: React.FC = () => {
  const routerRef = useRef<HTMLIonRouterOutletElement | null>(null);
  useEffect(() =>{
    if (!contexts.data.appState.firstInit) {
      setLoading(true);
      getOrders();
      contexts.data.appState.setFirstInit();
      setLoading(false);
    }
  });
  return (
    <IonContent>
      <IonTabs className="hideBg">
        <IonRouterOutlet ref={routerRef}>
          <Route exact path="/main" render={() => <MainActivity category={"0"}></MainActivity>}>
          </Route>
          <Route path="/item/:code" render={() => <ItemCard item={contexts.stores.itemsStore.getItem(contexts.data.appState.currentItem)}></ItemCard>}>
          </Route>
          <Route exact path={`/main/:code`} render={() => <MainActivity category={(contexts.data.appState.currentCategory)}></MainActivity>}/>
          <Route exact path="/stats">
            <StatsActivity />
          </Route>
          <Route exact path="/scanner">
            <ScannerActivity />
          </Route>
          <Route exact path="/stats/:id" render={() => <OrderCard order={contexts.stores.ordersStore.getOrder(contexts.data.appState.currentOrder)}></OrderCard>}/>
          <Route exact path="/sales" render={() => <SalesActivity router={null}></SalesActivity>}/>
          <Route exact path="/profile">
            <ProfileActivity />
          </Route>
          <Route exact path="/" render={() => <Redirect to="/main" />} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="main" href="/main">
            <IonIcon icon={storefrontOutline} />
            <IonLabel className="tabName">Склад</IonLabel>
          </IonTabButton>
          <IonTabButton tab="sales" href="/sales">
            <IonIcon icon={cartOutline} />
            <IonLabel className="tabName">Продажа</IonLabel>
          </IonTabButton>
          <IonTabButton tab="scan" href="/scanner">
            <IonIcon icon={scanOutline}/>
            <IonLabel className="tabName">Сканировать</IonLabel>
          </IonTabButton>
          <IonTabButton tab="stats" href="/stats">
            <IonIcon icon={statsChartOutline} />
            <IonLabel className="tabName">Статистика</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={personOutline} />
            <IonLabel className="tabName">Профиль</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonContent>
  );
};
export default TabNavigator;
