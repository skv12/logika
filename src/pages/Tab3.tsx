import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonText,
  IonCol,
  IonRow,
  IonList,
  IonIcon,
  IonButton,
  IonAlert,
  IonLoading,
} from "@ionic/react";
import "./Tab3.css";
import { Store, getDocs, h_type, SERV } from "./Store";
import {
  searchOutline,
  ellipsisHorizontalOutline,
  personCircleOutline,
  cashOutline,
  cardOutline,
  businessOutline,
  readerOutline,
} from "ionicons/icons";
import axios from "axios";

interface t_detail {
  Номенклатура: string;
  Количество: number;
  Сумма: number;
}

const Tab3: React.FC = () => {
  const [user, setUser] = useState(false);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<Array<t_detail>>([]);
  const [index, setIndex] = useState(0);

  function getDetail(date: Date, num: string) {
    let user = Store.getState().user;

    let params = {
      params: {
        Дата: date,
        Номер: num,
      },
    };
    axios
      .get(SERV() + "Детали", {
        auth: {
          username: unescape(encodeURIComponent(user.user)),
          password: unescape(encodeURIComponent(user.password)),
        },
        params,
      })
      .then((response) => response.data)
      .then((data) => {
        setDetail(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function Detail(props: { info }): JSX.Element {
    let i = index;
    let info = props.info;
    let info1 = Store.getState().docs;
    let elem = (
      <>
        <IonButton
          fill="clear"
          onClick={() => {
            setDetail([]);
          }}
        >
          <IonIcon icon={ellipsisHorizontalOutline} slot="icon-only"></IonIcon>
        </IonButton>
        <IonItem>
          <IonText class="f-1">Вид оплаты</IonText>

          <IonCol size="3" slot="end" class="f-1">
            {info1[i].Наличные === 0 ? (
              ""
            ) : (
              <IonRow class="">
                <IonRow>Наличные</IonRow> {info1[i].Наличные} руб{" "}
              </IonRow>
            )}
            {info1[i].Карта === 0 ? (
              ""
            ) : (
              <IonRow class="">
                <IonRow>Банковская карта</IonRow>
                {info1[i].Карта} руб
              </IonRow>
            )}
            {info1[i].Сертификат === 0 ? (
              ""
            ) : (
              <IonRow class="">
                <IonRow>Сертификат</IonRow>
                {info1[i].Сертификат} руб
              </IonRow>
            )}
            {info1[i].Банк === 0 ? (
              ""
            ) : (
              <IonRow class="">
                <IonRow>Банк</IonRow>
                {info1[i].Банк} руб{" "}
              </IonRow>
            )}
          </IonCol>
        </IonItem>
      </>
    );

    for (let i = 0; i < info.length; i++) {
      elem = (
        <>
          {elem}
          <IonItem>
            <IonText class="f-1">{info[i].Номенклатура}</IonText>
            <IonCol size="3" slot="end" class="f-1">
              <IonRow>
                <IonText>{info[i].Количество} шт</IonText>
              </IonRow>
              <IonRow>
                <IonText>{info[i].Сумма} руб</IonText>
              </IonRow>
            </IonCol>
          </IonItem>
        </>
      );
    }

    return elem;
  }

  function History(props: { info: Array<h_type> }): JSX.Element {
    let elem = <></>;
    let info = props.info;

    if (detail.length !== 0) {
      elem = <Detail info={detail} />;
    } else if (info.length > 0) {
      for (let i = 0; i < info.length; i++) {
        elem = (
          <>
            {elem}
            <IonItem
              onClick={() => {
                getDetail(info[i].Дата, info[i].Номер);
                setIndex(i);
              }}
            >
              <IonText class="f-1">{info[i].Документ}</IonText>
              <IonCol size="3" slot="end" class="f-1">
                <IonRow>
                  {info[i].Наличные +
                    info[i].Карта +
                    info[i].Сертификат +
                    info[i].Банк}{" "}
                  руб{" "}
                </IonRow>
                <IonRow>
                  {info[i].Наличные === 0 ? (
                    ""
                  ) : (
                    <IonIcon icon={cashOutline} class="ionIcon">
                      {" "}
                    </IonIcon>
                  )}
                  {info[i].Карта === 0 ? (
                    ""
                  ) : (
                    <IonIcon icon={cardOutline} class="ionIcon">
                      {" "}
                    </IonIcon>
                  )}
                  {info[i].Сертификат === 0 ? (
                    ""
                  ) : (
                    <IonIcon icon={readerOutline} class="ionIcon">
                      {" "}
                    </IonIcon>
                  )}
                  {info[i].Банк === 0 ? (
                    ""
                  ) : (
                    <IonIcon icon={businessOutline} class="ionIcon">
                      {" "}
                    </IonIcon>
                  )}
                </IonRow>
                {/* {info[i].Наличные === 0 ? (
                  ""
                ) : (
                  <IonRow class="ion-align-items-center">
                    <IonIcon icon={cashOutline} class="ionIcon">
                      {" "}
                    </IonIcon>
                    {info[i].Наличные} руб{" "}
                  </IonRow>
                )}
                {info[i].Карта === 0 ? (
                  ""
                ) : (
                  <IonRow class="ion-align-items-center">
                    <IonIcon icon={cardOutline} class="ionIcon">
                      {" "}
                    </IonIcon>
                    {info[i].Карта} руб 
                  </IonRow>
                )}
                {info[i].Сертификат === 0 ? (
                  ""
                ) : (
                  <IonRow class="ion-align-items-center">
                    <IonIcon icon={readerOutline} class="ionIcon"></IonIcon>{" "}
                    {info[i].Сертификат} руб
                  </IonRow>
                )}
                {info[i].Банк === 0 ? (
                  ""
                ) : (
                  <IonRow class="ion-align-items-center">
                    <IonIcon icon={businessOutline} class="ionIcon"></IonIcon>{" "}
                    {info[i].Банк} руб{" "}
                  </IonRow>
                )} */}
              </IonCol>
            </IonItem>
          </>
        );
      }
      elem = <IonList>{elem}</IonList>;
    }

    return elem;
  }

  async function Search(data) {
    setLoading(true);
    let res = await getDocs({ params: Store.getState().search });
    if (res) setLoading(false);
    else setLoading(false);
  }

  return (
    <IonPage>
      <IonLoading isOpen={loading} message={"Please wait..."} />
      <IonHeader>
        <IonToolbar>
          <IonTitle class="a-center">Иcтория</IonTitle>
          <IonButton
            slot="end"
            fill="clear"
            onClick={() => {
              setUser(true);
            }}
          >
            <IonIcon slot="icon-only" icon={personCircleOutline}></IonIcon>
          </IonButton>
          <IonButton
            slot="end"
            fill="clear"
            onClick={() => {
              setSearch(true);
            }}
          >
            <IonIcon slot="icon-only" icon={searchOutline}></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonItem class="f-1">
        <IonText> Документ</IonText>
        <IonCol slot="end" size="3">
          <IonRow>Сумма</IonRow>
        </IonCol>
      </IonItem>

      <IonContent>
        <History info={Store.getState().docs} />
      </IonContent>

      {/* Поиск */}
      <IonAlert
        isOpen={search}
        onDidDismiss={() => setSearch(false)}
        cssClass="my-custom-class"
        header={"Период"}
        message={"Поиск чеков с указанной даты вниз"}
        inputs={[
          {
            name: "Дата",
            type: "date",
            value: Store.getState().search.Дата,
            placeholder: "Дата",
          },
          {
            name: "Номенклатура",
            type: "text",
            value: Store.getState().search.Номенклатура,
            placeholder: "Номенклатура",
          },
        ]}
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
                type: "search",
                Дата: data.Дата,
                Номенклатура: data.Номенклатура,
              });
              Search(data);
            },
          },
        ]}
      />

      {/* Поиск */}
      <IonAlert
        isOpen={user}
        onDidDismiss={() => setUser(false)}
        cssClass="my-custom-class"
        header={"Период"}
        message={"Фильтр по пользователю"}
        inputs={[
          {
            name: "Пользователь",
            type: "checkbox",
            label: "Пользователь",
            value: "Пользователь",
            checked: Store.getState().search.Пользователь,
          },
        ]}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {},
          },
          {
            text: "Ok",
            handler: (data) => {
              let check = true;
              if (data.length === 0) check = false;
              Store.dispatch({ type: "search", Пользователь: check });
              Search(data);
            },
          },
        ]}
      />
    </IonPage>
  );
};

export default Tab3;
