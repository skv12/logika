import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSlides,
  IonSlide,
  IonGrid,
  IonIcon,
  IonButton,
  IonAlert,
  IonLoading,
  IonModal,
  IonDatetime,
  IonRadio,
  IonRadioGroup,
  IonItem,
  IonLabel,
  IonDatetimeButton,
  IonRow,
  IonCol,
} from "@ionic/react";

import { Store, getData, StoreToString } from "./Store";
import LineChart from "./chart";
import { formatISO, endOfDay } from "date-fns";
import "./Tab1.css";
import {
  syncOutline,
  layersOutline,
  optionsOutline,
  closeOutline,
  checkmarkOutline,
  peopleOutline,
} from "ionicons/icons";
import BarChart from "./UsersChart";
import PageHeader from "../components/PageHeader";

//const Tab1: React.FC = () => {
class Tab1 extends React.Component {
  state = {
    logout: false,
    stores: false,
    load: false,
    query: false,
    selectedPeriod: false,
    startdate: formatISO(endOfDay(new Date())),
    enddate: "",
    upd1: 0,
    upd2: 0,
    upd3: 0,
    upd4: 0,

    options: false,
    serv: "",
    port: "",
  };

  async setStore(data) {
    Store.dispatch({ type: "set_stock", data: false });
    data.forEach((stor) => {
      Store.dispatch({ type: "upd_stock", value: stor, checked: true });
    });

    let starr = StoreToString();

    Store.dispatch({ type: "p1", Склады: starr });

    Store.dispatch({ type: "list_stock" });
  }

  render() {
    const { logout } = this.state;

    Store.subscribe_store(() => {
      this.setState({
        upd1: this.state.upd1 + 1,
        upd2: this.state.upd2 + 1,
        upd3: this.state.upd3 + 1,
        upd4: this.state.upd4 + 1,
      });
    });

    return (
      <IonPage>
        <IonLoading isOpen={this.state.load} message={"Please wait..."} />
        <PageHeader name="График продаж"></PageHeader>
        <IonContent>
          <IonRow>
            <IonCol>
              <IonButton
                fill="clear"
                onClick={() => {
                  this.setState({ stores: true });
                }}
              >
                <IonIcon icon={layersOutline}></IonIcon>
                Склады
              </IonButton>
            </IonCol>
            <IonCol className="statbtn">
              <IonButton
                fill="clear"
                onClick={() => {
                  this.setState({ query: true });
                }}
              >
                <IonIcon icon={peopleOutline}></IonIcon>
                Статистика
              </IonButton>
            </IonCol>
          </IonRow>

          <IonSlides>
            <IonSlide>
              <IonGrid>
                <LineChart period="День" upd={this.state.upd1} />
              </IonGrid>
            </IonSlide>

            <IonSlide>
              <IonGrid>
                <LineChart period="Неделя" upd={this.state.upd2} />
              </IonGrid>
            </IonSlide>

            <IonSlide>
              <IonGrid>
                <LineChart period="Месяц" upd={this.state.upd3} />
              </IonGrid>
            </IonSlide>

            <IonSlide>
              <IonGrid>
                <LineChart period="Год" upd={this.state.upd4} />
              </IonGrid>
            </IonSlide>
          </IonSlides>
        </IonContent>

        <IonModal isOpen={this.state.query}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Статистика по продавцам</IonTitle>
              <IonButton
                fill="clear"
                slot="start"
                onClick={() => {
                  this.setState({ query: false });
                }}
              >
                <IonIcon slot="icon-only" icon={closeOutline}></IonIcon>
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonRadioGroup
              value={this.state.selectedPeriod}
              onIonChange={(e) =>
                this.setState({ selectedPeriod: e.detail.value })
              }
            >
              <IonItem>
                <IonLabel>День</IonLabel>
                <IonRadio value={false} />
              </IonItem>
              <IonItem>
                <IonLabel>Период</IonLabel>
                <IonRadio value={true} />
              </IonItem>
            </IonRadioGroup>
            <IonRow className="ion-padding-vertical">
              <IonCol>
                <input
                  id="startdate"
                  type="date"
                  onChange={(e) => this.setState({ startdate: e.target.value })}
                />
              </IonCol>
              <IonCol className="datecol">
                <input
                  hidden={!this.state.selectedPeriod}
                  id="enddate"
                  type="date"
                  onChange={(e) => this.setState({ enddate: e.target.value })}
                  min={this.state.startdate}
                />
              </IonCol>
            </IonRow>
            <BarChart
              startdate={this.state.startdate}
              enddate={this.state.enddate}
              period={this.state.selectedPeriod}
            ></BarChart>
          </IonContent>
        </IonModal>

        {/* Логоут */}
        <IonAlert
          isOpen={logout}
          onDidDismiss={() => this.setState({ logout: false })}
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
                this.setState({ auth: false });
              },
            },
          ]}
        />

        {/* Склады */}
        <IonAlert
          isOpen={this.state.stores}
          onDidDismiss={() => this.setState({ stores: false })}
          header={"Склады"}
          message={""}
          inputs={Store.getState().stores}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {},
            },
            {
              text: "Ok",
              handler: (data) => {
                this.setStore(data);
              },
            },
          ]}
        />

       
      </IonPage>
    );
  }
}

export default Tab1;
