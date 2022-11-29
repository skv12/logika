import { OverlayEventDetail } from "@ionic/core/components";
import {
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  useIonModal,
} from "@ionic/react";
import axios from "axios";
import { useState } from "react";
import { SERV } from "../data/DataApi";
import { h_type } from "../pages/Store";
import HistoryCard from "./HistoryCard";

interface ContainerProps {
  item: h_type;
}
interface t_detail {
  Номенклатура: string;
  Количество: number;
  Сумма: number;
}

const HistoryElement: React.FC<ContainerProps> = ({ item }) => {
  const [detail, setDetail] = useState<Array<t_detail>>([]);
  const [present, dismiss] = useIonModal(HistoryCard, {
    detail: detail,
    doc: item,
    onDismiss: () => dismiss(),
  });
  function getDetail(date: Date, num: string) {
    axios
      .get(SERV() + "Детали", {
        headers: {
          Authorization: "Basic " + localStorage.getItem("app_data_token"),
        },
        params: {
          Дата: date,
          Номер: num,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        setDetail(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function openModal(detail: Array<t_detail>) {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {},
    });
  }
  return (
    <IonItem
      lines="none"
      className="ion-no-padding"
      onClick={() => {
        getDetail(item.Дата, item.Номер);
        openModal(detail);
      }}
      // routerLink={"/tabs/tab2/" + goods.ГУИД}
    >
      <IonGrid>
        <IonRow className="ion-justify-content-between">
          <IonCol size="8">
            <IonText color="medium">Документ</IonText>
            <IonLabel class="ion-text-wrap">{item.Документ}</IonLabel>
          </IonCol>
          <IonCol size="4">
            <IonText color="medium">Сумма</IonText>
            <IonLabel class="ion-text-wrap price-text" color="secondary">
              {item.Наличные + item.Карта + item.Банк + item.Сертификат} руб
            </IonLabel>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default HistoryElement;
