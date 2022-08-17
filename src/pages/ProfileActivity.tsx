import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { scanOutline, stopCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { logoutUser } from "../data/user.actions";
import "./ProfileActivity.scss";

const ProfileActivity: React.FC = () => {

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Профиль</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="hideBg">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Профиль</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton
          type="submit"
          expand="block"
          onClick={() => logoutUser()}
          routerLink="/logout"
          routerDirection="none"
        >
          Выйти
        </IonButton> 
      </IonContent>
    </IonPage>
  );
};

export default ProfileActivity;
