import { OverlayEventDetail } from "@ionic/core/components";
import {
  IonButton,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
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

interface ContainerProps {
  goods: o_type;
}

const ItemElement: React.FC<ContainerProps> = ({ goods }) => {
  const [present, dismiss] = useIonModal(ItemCard, {
    item: goods,
    onDismiss: () => dismiss(),
  });

  function openModal(goods: o_type) {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {},
    });
  }
  return (
    <IonItem
      lines="none"
      className="ion-no-padding"
      onClick={() => {
        openModal(goods);
      }}
    >
      <IonGrid>
        <IonRow className="ion-justify-content-between">
          <IonCol size="9">
            <IonText color="medium">
              Склад: {goods.Склад} <br />
            </IonText>
            <IonLabel class="ion-text-wrap">{goods.Номенклатура}</IonLabel>
          </IonCol>
          <IonCol size="3">
            <IonText>
              {" "}
              {goods.Артикул} <br />
            </IonText>
            <IonText>
              {" "}
              {goods.Цена} руб <br />
            </IonText>
            <IonText>
              {" "}
              {goods.Остаток} шт <br />
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default ItemElement;
