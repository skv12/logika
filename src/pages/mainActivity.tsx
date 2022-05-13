import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { getCurrentCategory } from "../api/dataApi";
// import React, { useState } from "react";
// import { useRouteMatch } from "react-router";
import CCategoryList from "../components/CategoryList";

import "./MainActivity.scss";

const MainActivity: React.FC = () => {
  // const [store, setStore] = useState<string>("Все");
  // let { url } = useRouteMatch();
 // let { cat } = getCurrectCategory();
  let curCat = getCurrentCategory();
  console.log(curCat);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* {<IonSelect value={store} onIonChange={(e) => setStore(e.detail.value)} interface="popover">
          </IonSelect>} */}
            <IonTitle >{}</IonTitle>
        </IonToolbar>
      </IonHeader> 
      {
        curCat !== undefined ? <CCategoryList/> : <CCategoryList url={JSON.stringify(curCat)}/>
      }
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
