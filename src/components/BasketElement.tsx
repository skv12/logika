import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import {
  addCircleOutline,
  closeOutline,
  removeCircleOutline,
} from "ionicons/icons";
import { element_type, Store } from "../pages/Store";

interface ContainerProps {
  good: element_type;
}

const BasketElement: React.FC<ContainerProps> = ({ good }) => {
  function updBasket(ГУИД: string, amount: number) {
    let basket = Store.getState().basket;

    if (basket === undefined) basket = [];

    var commentIndex = basket.findIndex(function (b) {
      return b.ГУИД === ГУИД;
    });
    if (commentIndex >= 0) {
      let b_amount = basket[commentIndex].Количество;
      let sum = b_amount + amount;
      let total = basket[commentIndex].Цена * sum;

      if (sum === 0) delBasket(ГУИД);
      else {
        let bask = basket.map((todo) => {
          if (todo.ГУИД === good.ГУИД) {
            return { ...todo, Количество: sum, Сумма: total };
          } else {
            return todo;
          }
        });
        Store.dispatch({ type: "basket", basket: bask });
      }
    }
  }
  function delBasket(ГУИД: string) {
    let basket = Store.getState().basket;

    if (basket === undefined) basket = [];

    var commentIndex = basket.findIndex(function (b) {
      return b.ГУИД === ГУИД;
    });
    if (commentIndex >= 0) {
      basket.splice(commentIndex, 1);
      Store.dispatch({ type: "basket", basket: basket });
    }
  }
  return (
    <IonItem
      lines="none"
      className="ion-no-padding"
      // routerLink={"/tabs/tab2/" + goods.ГУИД}
    >
      <IonGrid>
        <IonRow>
          <IonCol size="8">
            <IonLabel color="medium" className="i-label">
              Товар
            </IonLabel>
            <IonText class="ion-text-wrap">{good.Наименование}</IonText>
          </IonCol>
          <IonCol size="4">
            <IonRow>
              <IonCol className="ion-no-padding">
                <IonLabel color="medium" className="i-label">
                  Сумма
                </IonLabel>
                <IonText class="ion-text-wrap price-text" color="secondary">
                  {good.Сумма}
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-no-padding col-flex">
                <IonButton
                  class="i-but"
                  fill="clear"
                  onClick={() => {
                    updBasket(good.ГУИД, -1);
                  }}
                >
                  <IonIcon
                    slot="icon-only"
                    icon={removeCircleOutline}
                  ></IonIcon>
                </IonButton>
              </IonCol>

              <IonCol className="ion-no-padding col-flex">
                <IonText class="ion-text-wrap">{good.Количество}</IonText>
              </IonCol>
              <IonCol className="ion-no-padding col-flex">
                <IonButton
                  class="i-but"
                  fill="clear"
                  onClick={() => {
                    updBasket(good.ГУИД, 1);
                  }}
                >
                  <IonIcon slot="icon-only" icon={addCircleOutline}></IonIcon>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonButton
        class="basket-remove"
        fill="clear"
        onClick={() => {
          delBasket(good.ГУИД);
        }}
      >
        <IonIcon slot="icon-only" icon={closeOutline}></IonIcon>
      </IonButton>
    </IonItem>
  );
};

export default BasketElement;
