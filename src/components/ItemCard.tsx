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
    IonImg,
  } from "@ionic/react";
  import { useState } from "react";
  import { contexts, getCurrentCategory } from "../api/dataApi";
import { Item } from "../data/store.state";
  // import React, { useState } from "react";
  // import { useRouteMatch } from "react-router";

  interface ContainerProps{
    item?: Item;
  }

  const ItemCard: React.FC<ContainerProps> = ({item}) => {
    if(item === undefined)
      return <IonText>Ничего</IonText>;
    else return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{item.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonImg>

          </IonImg>
          <IonGrid>
            <IonRow>
              <IonCol><IonText>Наименование</IonText></IonCol>
              <IonCol><IonText>{item.name}</IonText></IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonText>Код в номенклатуре</IonText></IonCol>
              <IonCol><IonText>{item.code}</IonText></IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonText>Цена</IonText></IonCol>
              <IonCol><IonText>{item.price} {item.currency}</IonText></IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonText>В наличии</IonText></IonCol>
              <IonCol><IonText>{item.quantity}</IonText></IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  };
  
  export default ItemCard;
  