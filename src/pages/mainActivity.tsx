import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonContent,
  IonButtons,
  IonBackButton,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  useIonLoading,
  IonLoading,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { contexts, getCategories, getItems, getStores } from "../api/dataApi";
import BackButton from "../components/BackButton";
// import React, { useState } from "react";
// import { useRouteMatch } from "react-router";
import CCategoryList from "../components/CategoryList";
import { setLoading } from "../data/user.actions";
import "./MainActivity.scss";
interface ContainerProps {
  category: string;
}
function doRefresh(event: CustomEvent<RefresherEventDetail>) {
  getStores();
  getCategories();
  getItems();
  setCategory("0");
  setTimeout(() => {
    console.log("Async operation has ended");
    event.detail.complete();
  }, 2000);
}
function setCategory(category: string) {
  return <CCategoryList parent={category} />;
}

const MainActivity: React.FC<ContainerProps> = ({ category }) => {
  const [store, setStore] = useState<string>("Все");
  const [showLoading, setShowLoading] = useState(contexts.data.appState.isLoading);
  console.log(contexts.data.appState.previousCategories);
  useEffect(() => {
    getStores();
    getCategories();
    getItems();
   // setShowLoading(false);
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons className="back_button" slot="start">
            <BackButton />
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
              return (
                <IonSelectOption value={elem.stores} key={elem.stores}>
                  {elem.stores} ({elem.priceType})
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen id="root" scrollY={false}>
        { showLoading ? (
          <>
            <IonLoading
              isOpen={contexts.data.appState.isLoading}
              message={"Загрузка..."}
            />
          </>
        ) : (
          <>
            <IonRefresher
              slot="fixed"
              onIonRefresh={doRefresh}
              pullFactor={0.5}
              pullMin={100}
              pullMax={200}
            >
              <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            {setCategory(category)}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MainActivity;
