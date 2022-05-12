import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
// import React, { useState } from "react";
// import { useRouteMatch } from "react-router";
import CCategoryList from "../components/CategoryList";

import "./MainActivity.scss";

const MainActivity: React.FC = () => {
  // const [store, setStore] = useState<string>("Все");
  // let { url } = useRouteMatch();
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
      <CCategoryList/>
      {/* <IonContent fullscreen>
        <IonList>
        {
        contexts.stores.categoriesStore.list.map(elem => {
          console.log(elem);
          // if(elem.parent == parent)
          return(
          <CCategory category={elem}/>)
        })
        }
        </IonList>
      </IonContent> */}
    </IonPage>
  );
};

export default MainActivity;
