import React, { useEffect, useState } from "react";
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
  IonInput,
  IonCheckbox,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { Store, SERV } from "./Store";
import { useHistory } from "react-router-dom";
import { optionsOutline } from "ionicons/icons";
import "./Login.scss";
import { Auth } from "../data/DataApi";

//const Tab1: React.FC = () => {
const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [e_auth, setEAuth] = useState(false);
  const [s_auth, setSAuth] = useState(false);
  const [tip, setTip] = useState("");
  const [options, setOptions] = useState(false);
  const [serv, setServ] = useState("");
  const [port, setPort] = useState("");
  const [s_toast, setToast] = useState(false);
  const [remember, setRemember] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  let history = useHistory();
  const loginEvent = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setFormSubmitted(true);
    if (!login) {
      setLoading(false);
      setLoginError(true);
    }
    if (!password) {
      setLoading(false);
      setPasswordError(true);
    }
    if (login && password) {
      if (await Auth(login, password, remember)) {
        setLoginFailed(true ? false : false);
        setLoading(false);
        history.push("/tabs");
      } else {
        setLoading(false);
        setLoginFailed(true);
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("app_data_login") === undefined) setLogin("");
    else setLogin(localStorage.getItem("app_data_login")!);
    if (
      localStorage.getItem("app_remember") === undefined ||
      localStorage.getItem("app_remember") === "false"
    )
      setRemember(false);
    else setRemember(true);
  }, []);

  return (
    <IonPage className="loginPage">
      <IonLoading isOpen={loading} message={"Please wait..."} />
      <form noValidate onSubmit={loginEvent}>
        <IonTitle
          className="loginPage__title"
          size="large"
          class="ion-text-center"
        >
          Логин
        </IonTitle>

        <IonInput
          className="loginPage__input"
          placeholder="Логин"
          type="text"
          value={login}
          onIonChange={(e) => setLogin(e.detail.value!)}
        />
        <IonInput
          className="loginPage__input"
          placeholder="Пароль"
          type="password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
        <IonItem className="checkbox ion-no-padding loginPage__checkbox">
          <IonCheckbox
            slot="start"
            checked={remember}
            onIonChange={(e) => setRemember(e.detail.value!)}
          >
            {" "}
          </IonCheckbox>
          <IonLabel>Запомнить</IonLabel>
        </IonItem>

        <IonButton type="submit" expand="block">
          Войти
        </IonButton>
      </form>

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
          },
          {
            text: "Ok",
            handler: (data) => {
              localStorage.setItem("StokHolm_SERV", data.Сервер);
              localStorage.setItem("StokHolm_PORT", data.Порт);
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
