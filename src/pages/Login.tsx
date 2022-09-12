import React, { useState } from "react";
import axios from "axios";
import {
  IonPage,
  IonLoading,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAlert,
  IonButton,
  IonIcon,
  IonToast,
} from "@ionic/react";
import { Store, SERV } from "./Store";
import { useHistory } from "react-router-dom";
import { optionsOutline } from "ionicons/icons";

//const Tab1: React.FC = () => {
const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(true);

  const [e_auth, setEAuth] = useState(false);
  const [s_auth, setSAuth] = useState(false);
  const [tip, setTip] = useState("");

  const [options, setOptions] = useState(false);
  const [serv, setServ] = useState("");
  const [port, setPort] = useState("");

  const [s_toast, setToast] = useState(false);

  const [message, setMessage] = useState("");

  let history = useHistory();

  function Auth(data) {
    setLoading(true);
    axios
      .get(SERV() + "Логин", {
        auth: {
          username: unescape(encodeURIComponent(data.Логин)),
          password: unescape(encodeURIComponent(data.Пароль)),
        },
      })
      .then((response) => response.data)
      .then((getData) => {
        setTip(getData.Тип);
        Store.dispatch({
          type: "us",
          auth: true,
          user: data.Логин,
          password: data.Пароль,
          role: getData.Тип,
        });
        console.log(data);
        localStorage.setItem("Stok_data_login", data.Логин);
        setLoading(false);
        setSAuth(true);
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.toString());
        console.log(error);
        setToast(true);
        setLogin(true);
      });
  }
  return (
    <IonPage>
      <IonLoading isOpen={loading} message={"Please wait..."} />

      <IonHeader>
        <IonToolbar>
          <IonTitle class="a-center">Логин</IonTitle>
          <IonButton
            slot="end"
            fill="clear"
            onClick={() => {
              let serv = localStorage.getItem("StokHolm_SERV");
              if (serv === null) serv = "188.244.191.2";
              let port = localStorage.getItem("StokHolm_PORT");
              if (port === null) port = "29080";
              setServ(serv);
              setPort(port);
              setOptions(true);
              //   this.setState({options: true, serv: serv, port: port})
            }}
          >
            <IonIcon icon={optionsOutline} slot="icon-only"></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent></IonContent>

      {/* Авторизция */}
      <IonAlert
        isOpen={login}
        onDidDismiss={() => setLogin(false)}
        header={"Авторизация"}
        message={""}
        inputs={[
          {
            name: "Логин",
            type: "text",
            placeholder: "Логин",
            value:
              localStorage.getItem("Stok_data_login") === undefined
                ? ""
                : localStorage.getItem("Stok_data_login"),
          },
          {
            name: "Пароль",
            type: "password",
            placeholder: "Пароль",
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
              Auth(data);
            },
          },
        ]}
      />

      {/* Авторизация не удалось */}
      <IonAlert
        isOpen={e_auth}
        onDidDismiss={() => setEAuth(false)}
        header={"Ошибка"}
        message={"Не удалось авторизироваться"}
        buttons={[
          {
            text: "Ok",
            handler: (data) => {
              setLogin(true);
            },
          },
        ]}
      />

      {/* Авторизация успех */}
      <IonAlert
        isOpen={s_auth}
        onDidDismiss={() => setSAuth(false)}
        header={"Поздравляем"}
        message={"Вы успешо авторизировались"}
        buttons={[
          {
            text: "Ok",
            handler: () => {
              if (tip === "Полный") history.push("/Tab1");
              if (tip === "Продажи") history.push("/Tab1");
              if (tip === "Доставка") history.push("/Tab4");
            },
          },
        ]}
      />
      {/* Оптионс */}
      <IonAlert
        isOpen={options}
        onDidDismiss={() => setOptions(false)}
        header={"Настройки"}
        message={""}
        inputs={[
          {
            name: "Сервер",
            type: "text",
            placeholder: "Сервер",
            value: serv,
          },
          {
            name: "Порт",
            type: "text",
            placeholder: "Порт",
            value: port,
          },
        ]}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              setLogin(true);
            },
          },
          {
            text: "Ok",
            handler: (data) => {
              localStorage.setItem("StokHolm_SERV", data.Сервер);
              localStorage.setItem("StokHolm_PORT", data.Порт);
              setLogin(true);
            },
          },
        ]}
      />

      <IonToast
        isOpen={s_toast}
        onDidDismiss={() => setToast(false)}
        message={message}
        duration={3500}
      />
    </IonPage>
  );
};

export default Login;
