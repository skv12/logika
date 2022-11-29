import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonSlides,
  IonSlide,
  IonGrid,
  IonAlert,
  IonLoading,
  IonRadio,
  IonRadioGroup,
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";

import { Store } from "./Store";
import LineChart from "./chart";
import { formatISO, endOfDay, format } from "date-fns";
import "./StatsActivity.scss";
import BarChart from "./UsersChart";
import PageHeader from "../components/PageHeader";

const StatsActivity: React.FC = () => {
  const [logout, setLogout] = useState(false);
  const [load, setLoad] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(false);
  const [startdate, setStartDate] = useState(
    format(endOfDay(new Date()), "yyyy-MM-dd")
  );
  const [enddate, setEndDate] = useState(
    format(endOfDay(new Date()), "yyyy-MM-dd")
  );
  const [upd1, setUpd1] = useState(0);

  const [segment, setSegment] = useState("shop");
  return (
    <IonPage>
      <IonLoading isOpen={load} message={"Please wait..."} />
      <PageHeader name="Статистика"></PageHeader>
      <div className="ion-padding-horizontal">
        <IonSegment
          value={segment}
          onIonChange={(e) => {
            setSegment(e.detail.value!);
          }}
          className=""
        >
          <IonSegmentButton value="shop" color="tertiary">
            <IonLabel>Магазин</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="cashiers">
            <IonLabel>Продавцы</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </div>

      <IonContent
        hidden={segment !== "shop" ? true : false}
        className="ion-padding"
      >
        <IonRefresher
          slot="fixed"
          onIonRefresh={() => {
            setTimeout(() => {
              setUpd1(upd1 + 1);
            }, 2000);
          }}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonSlides>
          <IonSlide>
            <IonGrid className="i-chart">
              <LineChart period="День" upd={upd1} />
            </IonGrid>
          </IonSlide>

          <IonSlide>
            <IonGrid className="i-chart">
              <LineChart period="Неделя" upd={upd1} />
            </IonGrid>
          </IonSlide>

          <IonSlide>
            <IonGrid className="i-chart">
              <LineChart period="Месяц" upd={upd1} />
            </IonGrid>
          </IonSlide>

          <IonSlide>
            <IonGrid className="i-chart">
              <LineChart period="Год" upd={upd1} />
            </IonGrid>
          </IonSlide>
        </IonSlides>
      </IonContent>
      <IonContent
        hidden={segment !== "cashiers" ? true : false}
        className="ion-padding"
      >
        <IonRadioGroup
          value={selectedPeriod}
          onIonChange={(e) => setSelectedPeriod(e.detail.value)}
        >
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>День</IonLabel>
                <IonRadio value={false} />
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel>Период</IonLabel>
                <IonRadio value={true} />
              </IonItem>
            </IonCol>
          </IonRow>
        </IonRadioGroup>
        <IonRow className="ion-padding-vertical">
          <IonCol>
            <input
              className="custom-date-input"
              id="startdate"
              type="date"
              value={startdate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </IonCol>
          <IonCol className="datecol">
            <input
              className="custom-date-input"
              hidden={!selectedPeriod}
              id="enddate"
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              min={startdate}
            />
          </IonCol>
        </IonRow>
        <BarChart
          startdate={startdate}
          enddate={enddate}
          period={selectedPeriod}
        ></BarChart>
      </IonContent>

      {/* Логоут */}
      <IonAlert
        isOpen={logout}
        onDidDismiss={() => setLogout(false)}
        header={"Выход"}
        message={"Выйти из аккаунта"}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {},
          },
          {
            text: "Ok",
            handler: (data) => {
              Store.dispatch({
                type: "us",
                auth: false,
                user: "",
                password: "",
                role: "",
              });
              localStorage.removeItem("app_remember");
              localStorage.removeItem("app_data_login");
              localStorage.removeItem("app_data_token");
            },
          },
        ]}
      />
    </IonPage>
  );
};

export default StatsActivity;
