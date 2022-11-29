import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { element_type,  Store } from "../pages/Store";
import update from "immutability-helper";
import backButton from "../res/backButton.svg";
interface ContainerProps {
  item: element_type;
  onDismiss: () => void;
}

const ItemCard: React.FC<ContainerProps> = ({ item, onDismiss }) => {
  const [showToast1, setShowToast1] = useState(false);

  function addBasket(amount: number) {
    let basket = Store.getState().basket;

    if (basket === undefined) basket = [];

    var commentIndex = basket.findIndex((b) => {
      return b.Артикул === item.Артикул;
    });
    if (commentIndex >= 0) {
      let b_amount = basket[commentIndex].Количество;
      let sum = b_amount + (amount as number);
      let total = basket[commentIndex].Цена * sum;
      var updated = update(basket[commentIndex], {
        Количество: { $set: sum },
        Сумма: { $set: total },
      });

      Store.dispatch({ type: "upd_basket", basket: updated });
    } else {
      Store.dispatch({
        type: "add_basket",
        basket: {
          ГУИД: "",
          Артикул: item.Артикул,
          Наименование: item.Наименование,
          Цена: item.Цена,
          Количество: amount,
          Сумма: item.Цена * amount,
        },
      });
    }
  }
  return (
    <>
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonTitle className="a-center"> Информация о товаре </IonTitle>
            <IonButtons>
              <IonButton
                slot="start"
                onClick={() => {
                  Store.dispatch({ type: "del_element" });
                  onDismiss();
                }}
              >
                <IonIcon slot="icon-only" icon={backButton}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonRow class="ion-justify-content-center">
            <IonImg src={item.Картинка} />
          </IonRow>
          <IonItem>
            <IonGrid class="i-item-modal">
              <IonRow>
                <IonCol>
                  <IonLabel color="medium" className="text_12">
                    Наименование
                  </IonLabel>
                  <IonText className="text_14">{item.Наименование}</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel color="medium" className="text_12">
                    Группа товара
                  </IonLabel>
                  <IonText className="text_14">{item.Группа}</IonText>
                </IonCol>
                <IonCol>
                  <IonLabel color="medium" className="text_12">
                    Артикул
                  </IonLabel>
                  <IonText className="text_14">{item.Артикул}</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel color="medium" className="text_12">
                    Склад
                  </IonLabel>
                  <IonText className="text_14">{item.Склад}</IonText>
                </IonCol>
                <IonCol>
                  <IonLabel color="medium" className="text_12">
                    Цена
                  </IonLabel>
                  <IonText className="text_14">{item.Цена}</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel color="medium" className="text_12">
                    Производитель
                  </IonLabel>
                  <IonText className="text_14">{item.Производитель}</IonText>
                </IonCol>
                <IonCol>
                  <IonLabel color="medium" className="text_12">
                    Импортер
                  </IonLabel>
                  <IonText className="text_14">
                    {item.ИмпортерКонтрагент === ""
                      ? "~"
                      : item.ИмпортерКонтрагент}
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel color="medium" className="text_12">
                    Остаток
                  </IonLabel>
                  <IonText className="text_14">{item.Остаток}</IonText>
                </IonCol>
                <IonCol>
                  <IonLabel color="medium" className="text_12">
                    Вес
                  </IonLabel>
                  <IonText className="text_14">
                    {item.Вес === 0 ? "~" : item.Вес + " кг"}
                  </IonText>
                </IonCol>
                <IonCol>
                  <IonLabel color="medium" className="text_12">
                    Объем
                  </IonLabel>
                  <IonText className="text_14">
                    {item.Объем === 0 ? "~" : item.Объем + " м³"}
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel color="medium" className="text_12">
                    Дополнительные реквизиты
                  </IonLabel>
                  {Object.keys(item.ДопРеквизиты).map((e) => {
                    return (
                      <IonText className="text_14" key={e}>
                        {e.replace(/_/g, " ")}:{" "}
                        {String(item.ДопРеквизиты[e]) === "true"
                          ? "Да"
                          : item.ДопРеквизиты[e] === "false"
                          ? "Нет"
                          : item.ДопРеквизиты[e]}
                      </IonText>
                    );
                  })}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
        </IonContent>

        <IonFooter className="ion-no-border ion-justify-content-center ion-flex">
          <IonButton
            fill="solid"
            className="height-standard ion-text-center ion-margin "
            onClick={() => {
              setShowToast1(true);
              addBasket(1);
            }}
            color="secondary"
          >
            Добавить в корзину
          </IonButton>
        </IonFooter>
        <IonToast
          isOpen={showToast1}
          onDidDismiss={() => setShowToast1(false)}
          message="Товар добавлен в корзину"
          position="bottom"
          duration={200}
        />
      </IonPage>
    </>
  );
};

export default ItemCard;
