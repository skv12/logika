import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
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
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Профиль</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Профиль" />
        <IonButton type="submit" expand="block" onClick={() => logoutUser()} routerLink="/logout" routerDirection="none">Выйти</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProfileActivity;
