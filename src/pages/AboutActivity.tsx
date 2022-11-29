import React from "react";
import {
  IonContent,
  IonPage,
  IonGrid,
  IonImg,
  IonText,
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonIcon,
} from "@ionic/react";
import logo from "../res/icon.png";
import mailIcon from "../res/mail.svg";
import phoneIcon from "../res/lock.svg";
import "./AboutActivity.css";
import PageHeader from "../components/PageHeader";

const AboutActivity: React.FC = () => {
  const divStyle = {
    backgroundColor: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    marginRight: "10px",
  };
  return (
    <IonPage>
      <PageHeader name="О программе"></PageHeader>
      <IonContent>
        <IonGrid className="ion-padding-horizontal">
          <IonRow>
            <IonCol>
              <IonImg src={logo} className="about_img"></IonImg>
            </IonCol>
            <IonCol className="flex-col">
              <IonLabel color="medium" className="d-flex">
                Разработано:
              </IonLabel>
              <IonText color="medium">ООО "Логика"</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText class="ion-text-center text_12">
                <h1>ReAssistant</h1>
                <p>
                  Нашли ошибку или есть пожелания <br></br>по поводу приложения?
                </p>
                <p color="secondary">Свяжитесь с нами</p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonItem color="secondary" href="tel:89142722511">
            <div style={divStyle}>
              <IonIcon slot="icon-only" icon={phoneIcon} color="secondary" />
            </div>
            <IonLabel>+7(914) 272-25-11</IonLabel>
          </IonItem>
          <IonItem color="secondary" href="mailto:logika1c@mail.ru">
            <div style={divStyle}>
              <IonIcon slot="icon-only" icon={mailIcon} color="secondary" />
            </div>

            <IonLabel>logika1c@mail.ru</IonLabel>
          </IonItem>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AboutActivity;
