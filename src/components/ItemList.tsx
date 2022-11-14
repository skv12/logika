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
import { getImg, o_type, Store, t_good, t_image } from "../pages/Store";
import ItemCard from "./ItemCard";
import ItemElement from "./ItemElement";

interface ContainerProps {
  goods: Array<o_type>;
}

const ItemList: React.FC<ContainerProps> = ({ goods }) => {
  return (
    <IonList className="ion-padding">
      {goods.map((elem, index) => {
        if(elem.ЭтоГруппа)
            return
        return <ItemElement goods={elem} key={index} />;
      })}
    </IonList>
  );
};

export default ItemList;
