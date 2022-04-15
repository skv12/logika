import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/react";
import React from "react";
import { getCategories } from "../api/dataApi";
import ExploreContainer from "../components/ExploreContainer";

import "./MainActivity.scss";

const MainActivity: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Склад</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton type="submit" expand="block" onClick={() => getCategories("data/parseData", "ЛОФТ")}>Выйти</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MainActivity;
