import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonSelectOption,
  IonSelect,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { getCategories, getItems, getServerIP, getStores, contexts, getCurrectCategory } from "../api/dataApi";
import CCategory from "../components/Category";

import "./MainActivity.scss";

const MainActivity: React.FC = () => {
  const [store, setStore] = useState<string>("Все");
  let { url } = useRouteMatch();
 // let { cat } = getCurrectCategory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* {<IonSelect value={store} onIonChange={(e) => setStore(e.detail.value)} interface="popover">
          </IonSelect>} */}
            <IonTitle >{}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {
        
        contexts.stores.categoriesStore.list.map(elem => {
          console.log(elem);
          // if(elem.parent == parent)
          return(
          <CCategory category={elem}/>)
        })
        }
        <IonButton type="submit" expand="block" onClick={() => console.log(contexts.stores.categoriesStore.list)}>
          Получить категории
        </IonButton>
        <IonButton type="submit" expand="block" onClick={() => getItems("Стулья", "Розничная")}>
          Получить товары
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MainActivity;
