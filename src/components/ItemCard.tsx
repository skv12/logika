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
  IonButton,
  IonImg,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonInput,
  useIonViewWillLeave,
} from "@ionic/react";
import { addCircle, removeCircle } from "ionicons/icons";
import { useState } from "react";
import { contexts } from "../api/dataApi";
import { Item } from "../data/store.state";

interface ContainerProps {
  item: Item;
} 
const ItemCard: React.FC<ContainerProps> = ( {item} ) => {
  useIonViewWillLeave(() => {
    contexts.data.appState.purgeItem();
    contexts.data.appState.purgeScannedItem();
  });
  const [amount, setAmount] = useState(contexts.data.cartStore.getItem(item.code));
  const increment = async () => {
    setAmount((c: number) => {
      if(c === item.quantity)
        return c;
      else
        return ++c;
    });
  };
  const decrement = async () => {
    setAmount((c: number) => {
      if (c > 1) 
        return --c;
      else
        return 1;
    });
  };
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start" color="black">
              <IonBackButton />
            </IonButtons>
            <IonTitle>{item.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonImg></IonImg>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonText>Наименование</IonText>
              </IonCol>
              <IonCol>
                <IonText>{item.name}</IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText>Код в номенклатуре</IonText>
              </IonCol>
              <IonCol>
                <IonText>{item.code}</IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText>Цена</IonText>
              </IonCol>
              <IonCol>
                <IonText>
                  {item.price} {item.currency}
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText>В наличии</IonText>
              </IonCol>
              <IonCol>
                <IonText>{item.quantity}</IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText>Штрихкод</IonText>
              </IonCol>
              <IonCol>
                <IonText>{item.barcode}</IonText>
              </IonCol>
            </IonRow>
            <IonRow></IonRow>
            <IonRow>
            <IonButton
                onClick={(e) => {
                  e.preventDefault();
                  decrement();
                }}
              >
                <IonIcon icon={removeCircle}></IonIcon>
              </IonButton>
              <IonInput>{amount}</IonInput>
              <IonButton
                onClick={(e) => {
                  e.preventDefault();
                  increment();
                }}
              >
                <IonIcon icon={addCircle}></IonIcon>
              </IonButton>
              
              
              <IonButton
                onClick={(e) => {
                  e.preventDefault();
                  contexts.data.cartStore.addItem(item.code, amount);
                }}
              >
                Добавить в корзину
              </IonButton>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
};

export default ItemCard;
