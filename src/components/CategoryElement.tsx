import { OverlayEventDetail } from "@ionic/core/components";
import {
  IonButton,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonFabList,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import { listOutline } from "ionicons/icons";
import { useState } from "react";
import { item_type, Store } from "../pages/Store";
import ItemCard from "./ItemCard";
import ItemElement from "./ItemElement";

interface ContainerProps {
  good: item_type;
}

const CategoryElement: React.FC<ContainerProps> = ({ good }) => {
  return (
    <IonItem>
      <IonText class="f-1">{good.Номенклатура}</IonText>
      <IonButton
        slot="end"
        fill="clear"
        onClick={() => {
          Store.dispatch({ type: "gr_add", Группа: good.Код });
          //Search();
        }}
      >
        <IonIcon slot="icon-only" icon={listOutline}></IonIcon>
      </IonButton>
    </IonItem>
  );
};

export default CategoryElement;
