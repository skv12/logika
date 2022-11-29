import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { getData } from "../data/DataApi";
import { Store } from "../pages/Store";
import backButton from "../res/backButton.svg";
import BasketList from "./BasketList";
interface ContainerProps {
  itemCount: number;
  onDismiss: () => void;
}

const Basket: React.FC<ContainerProps> = ({ itemCount, onDismiss }) => {
  const [docnum, setDocnum] = useState("");
  const [doc, setDoc] = useState(false);
  const setOrder = async () => {
    let basket = Store.getState().basket;

    let params = {
      Товары: basket,
    };
    let res = await getData("СоздатьЧек", params);
    if (res.Код === 100) {
      setDocnum(res.Номер);
      setDoc(true);
      Store.dispatch({ type: "cl_basket" });
    }
  };
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="a-center"> Корзина </IonTitle>
          <IonButtons>
            <IonButton
              slot="start"
              onClick={() => {
                onDismiss();
              }}
            >
              <IonIcon slot="icon-only" icon={backButton}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <BasketList itemCount={itemCount} />
        </IonGrid>
      </IonContent>

      <IonFooter className="ion-padding-horizontal">
        <IonToolbar>
          <IonButton
            slot="start"
            onClick={() => {
              Store.dispatch({ type: "cl_basket" });
              onDismiss();
            }}
            className="height-standard"
            color="secondary"
          >
            Отменить
          </IonButton>
          <IonButton
            slot="end"
            onClick={() => {
              setOrder();
              onDismiss();
            }}
            className="height-standard"
            color="secondary"
          >
            Чек
          </IonButton>
        </IonToolbar>
      </IonFooter>
      <IonAlert
        isOpen={doc}
        onDidDismiss={() => setDoc(false)}
        header={docnum}
        message={"Документ создан"}
        buttons={[
          {
            text: "Ok",
            handler: (data) => {},
          },
        ]}
      />
    </IonPage>
  );
};

export default Basket;
