import React, { useRef, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonIcon,
  IonButton,
  IonLoading,
  IonModal,
  IonLabel,
  IonInput,
  IonCheckbox,
  IonFooter,
} from "@ionic/react";
import "./HistoryActivity.scss";
import { getDocs } from "../data/DataApi";
import { Store } from "./Store";
import { searchOutline } from "ionicons/icons";
import { OverlayEventDetail } from "@ionic/core";
import HistoryList from "../components/HistoryList";

const HistoryActivity: React.FC = () => {
  const [user, setUser] = useState(Store.getState().search.Пользователь);
  const [item, setItem] = useState(Store.getState().search.Номенклатура);
  const [date, setDate] = useState(Store.getState().search.Дата);
  const [loading, setLoading] = useState(false);

  function onWillDismissModal(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      Store.dispatch({
        type: "search",
        Номенклатура: item,
        Дата: date,
        Пользователь: user,
      });
      Search();
    }
  }
  async function Search() {
    setLoading(true);
    let res = await getDocs(Store.getState().search);
    if (res) setLoading(false);
    else setLoading(false);
  }
  const modal = useRef<HTMLIonModalElement>(null);
  return (
    <IonPage>
      <IonLoading isOpen={loading} message={"Загрузка"} />
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle class="a-center">Иcтория</IonTitle>
          <IonButton slot="end" fill="clear" id="open-modal">
            <IonIcon slot="icon-only" icon={searchOutline}></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <HistoryList items={Store.getState().docs} />
      </IonContent>
      <IonModal
        ref={modal}
        className="custom-modal"
        trigger="open-modal"
        onWillDismiss={(ev) => onWillDismissModal(ev)}
      >
        <div>
          <IonHeader className="custom-modal-header ion-no-border ion-padding">
            <IonLabel className="alert-title sc-ion-alert-md">
              Поиск чеков
            </IonLabel>
          </IonHeader>

          <div className="custom-modal-content ion-padding-horizontal">
            <IonItem>
              <IonLabel>Номенклатура</IonLabel>
              <IonInput
                type="text"
                value={item}
                onIonChange={(e) => setItem(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Дата</IonLabel>
              <IonInput
                type="date"
                pattern="date"
                value={date}
                onIonChange={(e) => setDate(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonCheckbox
                slot="start"
                checked={user}
                onIonChange={(e) => setUser(e.detail.checked!)}
              ></IonCheckbox>
              <IonLabel>Мои заказы</IonLabel>
            </IonItem>
          </div>
          <IonFooter className="custom-modal-footer ion-no-border">
            <IonButton
              color="secondary"
              onClick={() => modal.current?.dismiss()}
            >
              Отмена
            </IonButton>
            <IonButton
              color="secondary"
              className="alert-button"
              onClick={(e) =>
                modal.current?.dismiss(e.currentTarget, "confirm")
              }
            >
              Принять
            </IonButton>
          </IonFooter>
        </div>
      </IonModal>
    </IonPage>
  );
};

export default HistoryActivity;
