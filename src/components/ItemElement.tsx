import { OverlayEventDetail } from "@ionic/core/components";
import {
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  useIonLoading,
  useIonModal,
} from "@ionic/react";
import { getElement } from "../data/DataApi";
import { item_type, Store } from "../pages/Store";
import ItemCard from "./ItemCard";

interface ContainerProps {
  goods: item_type;
}

const ItemElement: React.FC<ContainerProps> = ({ goods }) => {
  const [showLoading, closeLoading] = useIonLoading();
  const [present, dismiss] = useIonModal(ItemCard, {
    item: Store.getState().element,
    onDismiss: () => dismiss(),
  });

  const openModal = () => {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {},
    });
  };
  return (
    <IonItem
      lines="none"
      className="ion-no-padding"
      onClick={async () => {
        showLoading({
          message: "Получение данных",
        });
        if (await getElement(goods.ГУИД, goods.Склад)) {
          closeLoading();
          openModal();
        }
      }}
    >
      <IonGrid>
        <IonRow className="ion-justify-content-between">
          <IonCol size="8">
            <IonText color="medium">
              Склад: {goods.Склад} <br />
            </IonText>
            <IonLabel class="ion-text-wrap">{goods.Номенклатура}</IonLabel>
          </IonCol>
          <IonCol size="4">
            <IonText color="medium">
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
