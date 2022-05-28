import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonContent,
  IonButtons,
  IonBackButton
} from "@ionic/react";
import { useState } from "react";
import { contexts } from "../api/dataApi";
import BackButton from "../components/BackButton";
// import React, { useState } from "react";
// import { useRouteMatch } from "react-router";
import CCategoryList from "../components/CategoryList";
import "./MainActivity.scss";
interface ContainerProps {
  category: string;
}
const MainActivity: React.FC<ContainerProps> = ({ category }) => {
  const [store, setStore] = useState<string>("Все");
  console.log(contexts.data.appState.previousCategories);
  
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
      <IonContent fullscreen>
        <CCategoryList parent={category} />
      </IonContent>
    </IonPage>
  );
};

export default MainActivity;
