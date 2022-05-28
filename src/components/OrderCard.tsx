import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonContent,
    IonImg,
    IonButtons,
    IonBackButton,
  } from "@ionic/react";
import { contexts } from "../api/dataApi";
  import { Order } from "../data/store.state";
  
  interface ContainerProps {
    order?: Order;
  }
  
  const OrderCard: React.FC<ContainerProps> = ({ order }) => {
    console.log(contexts.stores.ordersStore.list);
    if (order === undefined) return <IonText>Ничего</IonText>;
    else
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start" color="black">
                <IonBackButton />
              </IonButtons>
              <IonTitle>{order.name}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonImg></IonImg>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonText>Наименование заказа</IonText>
                </IonCol>
                <IonCol>
                  <IonText>{order.name}</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonText>Номер заказа</IonText>
                </IonCol>
                <IonCol>
                  <IonText>{order.id}</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonText>Сумма заказа</IonText>
                </IonCol>
                <IonCol>
                  <IonText>
                    {order.sumOrder} руб.
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonText>Выполнен</IonText>
                </IonCol>
                <IonCol>
                {order.completed ? <>
                  <IonText>Да</IonText>
                  </>
                  :
                  <>
                  <IonText>Нет</IonText>
                  </>
                }
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonText>Сумма заказа</IonText>
                </IonCol>
                <IonCol>
                  <IonText>
                    {order.customer}
                  </IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      );
  };
  
  export default OrderCard;
  