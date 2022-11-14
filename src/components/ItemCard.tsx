import {
  IonButton,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { arrowBackOutline, closeOutline, listOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { getImg, o_type, Store, t_good, t_image } from "../pages/Store";
import update from "immutability-helper";

interface ContainerProps {
  item: o_type;
  onDismiss: () => void,
}

const g_state: t_good = {
  ГУИД: "",
  Артикул: "",
  Наименование: "",
  Цена: 0,
  Количество: 0,
  Сумма: 0,
  Склад: "",
  Остаток: 0,
  Группа: "",
  Вес: 0,
  Объем: 0,
  Производитель: "",
  ИмпортерКонтрагент: "",
  ДопРеквизиты: [],
};

const gimages_state: t_image = {
  ГУИД: "",
  Картинка: "",
};

const ItemCard: React.FC<ContainerProps> = ({ item, onDismiss }) => {
  const [good, setGood] = useState<t_good>(g_state);
  const [gimage, setGimage] = useState<t_image>(gimages_state);
  const [showToast1, setShowToast1] = useState(false);
  useEffect(() => {
    setGood({
      ГУИД: item.ГУИД,
      Артикул: item.Артикул,
      Наименование: item.Номенклатура,
      Цена: item.Цена,
      Количество: 1,
      Сумма: item.Цена,
      Склад: item.Склад,
      Остаток: item.Остаток,
      Группа: item.Группа,
      Вес: item.Вес,
      Объем: item.Объем,
      Производитель: item.Производитель,
      ИмпортерКонтрагент: item.ИмпортерКонтрагент,
      ДопРеквизиты: item.ДопРеквизиты,
    });

    //getImg(item.ГУИД);
    setGimage(Store.getState().gimages);
  }, []);
  function addBasket(amount: number) {
    let basket = Store.getState().basket;

    if (basket === undefined) basket = [];

    var commentIndex = basket.findIndex(function (b) {
      return b.Артикул === good.Артикул;
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
          Артикул: good.Артикул,
          Наименование: good.Наименование,
          Цена: good.Цена,
          Количество: amount,
          Сумма: good.Цена * amount,
        },
      });
    }
  }
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButton
              fill="clear"
              slot="start"
              onClick={() => {
                onDismiss();
                Store.dispatch({ type: "del_img" });
              }}
            >
              <IonIcon slot="icon-only" icon={arrowBackOutline}></IonIcon>
            </IonButton>
            <IonTitle> Информация о товаре </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonGrid class="i-item-modal">
            <IonRow class="ion-justify-content-center">
              <IonImg src={gimage.Картинка} />
            </IonRow>
            <IonRow>
              <IonItemDivider>
                <IonLabel>Наименование</IonLabel>
              </IonItemDivider>
              <IonItem lines="none">{good.Наименование}</IonItem>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItemDivider>
                  <IonLabel>Группа товара</IonLabel>
                </IonItemDivider>
                <IonItem lines="none">{good.Группа}</IonItem>
              </IonCol>
              <IonCol>
                <IonItemDivider>
                  <IonLabel>Артикул</IonLabel>
                </IonItemDivider>
                <IonItem lines="none">{good.Артикул}</IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItemDivider>
                  <IonLabel>Склад</IonLabel>
                </IonItemDivider>
                <IonItem lines="none">{good.Склад}</IonItem>
              </IonCol>
              <IonCol>
                <IonItemDivider>
                  <IonLabel>Цена</IonLabel>
                </IonItemDivider>
                <IonItem lines="none">{good.Цена}</IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItemDivider>
                  <IonLabel>Производитель</IonLabel>
                </IonItemDivider>
                <IonItem lines="none">
                  {good.Производитель === "" ? "~" : good.Производитель}
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItemDivider>
                  <IonLabel>Импортер</IonLabel>
                </IonItemDivider>
                <IonItem lines="none">
                  {good.ИмпортерКонтрагент === ""
                    ? "~"
                    : good.ИмпортерКонтрагент}
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItemDivider>
                  <IonLabel>Остаток</IonLabel>
                </IonItemDivider>
                <IonItem lines="none">{good.Остаток} шт</IonItem>
              </IonCol>
              <IonCol>
                <IonItemDivider>
                  <IonLabel>Вес</IonLabel>
                </IonItemDivider>
                <IonItem lines="none">
                  {good.Вес === 0 ? "~" : good.Вес} кг
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItemDivider>
                  <IonLabel>Объем</IonLabel>
                </IonItemDivider>
                <IonItem lines="none">
                  {good.Объем === 0 ? "~" : good.Объем} м³{" "}
                </IonItem>
              </IonCol>
            </IonRow>
            <IonCol>
              <IonItemDivider>
                <IonLabel>Дополнительные реквизиты</IonLabel>
              </IonItemDivider>
              {Object.keys(good.ДопРеквизиты).map((e) => {
                return (
                  <IonItem lines="none" key={e}>
                    {e.replace(/_/g, " ")}:{" "}
                    {String(good.ДопРеквизиты[e]) === "true"
                      ? "Да"
                      : good.ДопРеквизиты[e] === "false"
                      ? "Нет"
                      : good.ДопРеквизиты[e]}
                  </IonItem>
                );
              })}
            </IonCol>
          </IonGrid>
        </IonContent>

        <IonFooter>
          <IonToolbar>
            <IonButton
              fill="clear"
              slot="end"
              onClick={() => {
                setShowToast1(true);
                addBasket(1);
              }}
            >
              {" "}
              Добавить в корзину
            </IonButton>
          </IonToolbar>
        </IonFooter>
      </IonPage>
      <IonToast
        isOpen={showToast1}
        onDidDismiss={() => setShowToast1(false)}
        message="Товар добавлен в корзину"
        position="middle"
        duration={200}
      />
    </>
  );
};

export default ItemCard;
