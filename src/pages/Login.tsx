import React, { useState } from "react";
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
  IonInput,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { optionsOutline } from "ionicons/icons";
import "./Login.scss";
import AuthContext from "../Auth";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState(false);
  const [serv, setServ] = useState("");
  const [port, setPort] = useState("");
  const [base, setBase] = useState("");
  const [remember, setRemember] = useState(false);
  const { Auth } = React.useContext(AuthContext);
  let history = useHistory();
  const loginEvent = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!login) {
      setLoading(false);
    }
    if (!password) {
      setLoading(false);
    }
    if (login && password) {
      if (await Auth(false, remember, login, password)) {
        setLoading(false);
        history.push("/tabs");
      } else {
        setLoading(false);
      }
    }
  };
  // useEffect(() => {
  //   if (localStorage.getItem("app_data_login") === undefined) setLogin("");
  //   else setLogin(localStorage.getItem("app_data_login")!);
  //   if (
  //     localStorage.getItem("app_remember") === undefined ||
  //     localStorage.getItem("app_remember") === "false"
  //   )
  //     setRemember(false);
  //   else {
  //     setRemember(true);
  //     Auth(true);
  //     console.log(Store.getState().user.auth);
  //     history.push("/tabs");
  //   }
  // }, [Auth, history]);

  return (
    <IonPage className="loginPage">
      <IonHeader className="headerCustom ion-no-border">
        <IonToolbar>
          <IonTitle
            className="loginPage__title a-center"
            size="large"
            class="ion-text-center"
          >
            Вход
          </IonTitle>
          <IonButton
            slot="end"
            fill="clear"
            onClick={() => {
              let serv = localStorage.getItem("serv");
              if (serv === null) serv = "";
              let port = localStorage.getItem("port");
              if (port === null) port = "";
              let base = localStorage.getItem("base");
              if (base === null) base = "";
              setOptions(true);
              setServ(serv);
              setPort(port);
              setBase(base);
            }}
          >
            <IonIcon icon={optionsOutline} slot="icon-only"></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonLoading isOpen={loading} message={"Подключаемся"} />
      <IonContent className="center vertical-center">
        <IonGrid className="ion-padding ion-align-items-center ">
          <IonRow>
            <IonCol>
              <IonText class="ion-text-center" color="medium">
                <p>Добро пожаловать! Пожалуйста, введите ваши данные</p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow class="ion-align-items-center">
            <IonCol>
              <form noValidate onSubmit={loginEvent} className="">
                <IonInput
                  className="loginPage__input height-standard"
                  placeholder="Логин"
                  type="text"
                  value={login}
                  onIonChange={(e) => setLogin(e.detail.value!)}
                />
                <IonInput
                  className="loginPage__input height-standard"
                  placeholder="Пароль"
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                />
                {/* <IonItem className="checkbox ion-no-padding loginPage__checkbox">
                  <IonCheckbox
                    slot="start"
                    checked={remember}
                    onIonChange={(e) => setRemember(e.detail.checked)}
                  ></IonCheckbox>
                  <IonLabel>Запомнить</IonLabel>
                </IonItem> */}

                <IonButton
                  type="submit"
                  className="height-standard"
                  color="secondary"
                  expand="block"
                >
                  Войти
                </IonButton>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonAlert
          isOpen={options}
          onDidDismiss={() => setOptions(false)}
          header={"Настройки"}
          message={""}
          inputs={[
            {
              name: "serv",
              type: "text",
              placeholder: "Сервер",
              value: serv,
            },
            {
              name: "port",
              type: "text",
              placeholder: "Порт",
              value: port,
            },
            {
              name: "base",
              type: "text",
              placeholder: "База",
              value: base,
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
                localStorage.setItem("serv", data.serv);
                localStorage.setItem("port", data.port);
                localStorage.setItem("base", data.base);
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
