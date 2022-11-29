import {
  IonCol,
  IonGrid,
  IonLabel,
  IonList,
  IonRow,
  IonText,
} from "@ionic/react";
import { Store } from "../pages/Store";
import BasketElement from "./BasketElement";

interface ContainerProps {
  itemCount: number;
}

const ItemList: React.FC<ContainerProps> = ({ itemCount }) => {
  let basket = Store.getState().basket;
  let sum = 0;
  let count = 0;
  return (
    <>
      <IonList className="ion-padding">
        {basket.map((elem, index) => {
          sum += elem.Сумма;
          count += elem.Количество;
          return <BasketElement good={elem} key={index} />;
        })}
      </IonList>
      <IonGrid className="ion-padding">
        <IonRow>
          <IonCol size="8">
            <IonLabel className="ion-text-left text_12" color="primary">
              Всего
            </IonLabel>
          </IonCol>
          <IonCol size="4">
            <IonLabel className="ion-text-left text_12 " color="primary">
              Итого на сумму
            </IonLabel>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol
            size="8"
            class="t-right ion-text-left"
            color="primary"
          >
            <IonText className="ion-text-left price-text">{count}</IonText>
          </IonCol>
          <IonCol
            size="4"
            class="t-right ion-text-left"
            color="primary"
          >
            <IonText className="ion-text-left price-text">{sum}</IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default ItemList;
