import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonContent,
  IonButton,
  IonRouterLink,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useState } from "react";
import { contexts, getCurrentCategory } from "../api/dataApi";
// import React, { useState } from "react";
// import { useRouteMatch } from "react-router";
import CCategoryList from "../components/CategoryList";
import { useHistory } from "react-router-dom";
import "./MainActivity.scss";
import { Category } from "../data/store.state";

interface ContainerProps{
  category?: string;
}

const MainActivity: React.FC<ContainerProps> = ({category}) => {
  const [store, setStore] = useState<string>("Все");
  // let { url } = useRouteMatch();
  // let { cat } = getCurrectCategory();
  let curCat = getCurrentCategory();
  console.log(curCat);
  let history =useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
                <IonText slot="primary">Склад</IonText>
                <IonSelect
                  value={store}
                  onIonChange={(e) => setStore(e.detail.value)}
                  interface="action-sheet"
                  slot="end"
                >
                  <IonSelectOption value={"Все"}>Все</IonSelectOption>
                  {contexts.stores.stocksStore.list.map((elem) => {
                    console.log(elem.stores);
                    return (
                      <IonSelectOption value={elem.stores} key={elem.stores}>
                        {elem.stores} ({elem.priceType})
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>

        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonButton onClick={() =>{
        history.push("/item");
      }}>Пример товара</IonButton>
        {category === undefined ? (
          <CCategoryList />
        ) : (
          <CCategoryList parent={category} />
        )}

        {/* <IonList>
        {
        contexts.stores.categoriesStore.list.map(elem => {
          console.log(elem);
          // if(elem.parent == parent)
          return(
          <CCategory category={elem}/>)
        })
        }
        </IonList> */}
        
      </IonContent>
    </IonPage>
  );
};

export default MainActivity;
