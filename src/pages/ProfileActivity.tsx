import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
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
  const [showToast, setShowToast] = useState(false);
  const [message2, setMessage2] = useState("");
  const [hideBg, setHideBg] = useState("");
  const openScanner = async () => {
    BarcodeScanner.hideBackground();
    document.body.style.opacity = "0";
    document.body.style.background = "transparent";
    setHideBg("hideBg");
    const data = await BarcodeScanner.startScan();
    if (data.content) {
      BarcodeScanner.showBackground();
      document.body.style.opacity = "1";
      document.body.style.background = "";
      stopScan();
      present(data.content!, [{ text: "OK", role: "cancel" }]);
    }
  };
  const stopScan = () => {
    BarcodeScanner.showBackground();
    document.body.style.opacity = "1";
    document.body.style.background = "";
    BarcodeScanner.stopScan();
    setHideBg("");
  };
  const [present] = useIonAlert();
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const status = await BarcodeScanner.checkPermission({ force: true });

        if (status.granted) {
          return true;
        }

        return false;
      } catch (error) {
        setMessage2("Ошибка прав");
        setShowToast(true);
      }
    };

    checkPermission();

    return () => {};
  }, []);
  return (
    <IonPage>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={message2}
        duration={3500}
      />
      <IonHeader>
        <IonToolbar>
          <IonTitle>Профиль</IonTitle>
          <IonButtons slot="end">
            <IonButton color="danger" hidden={!hideBg} onClick={stopScan}>
              <IonIcon icon={stopCircleOutline} slot="start" />
              Stop Scan
            </IonButton>
          </IonButtons>
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
        <IonButton
          className="start-scan-button"
          hidden={!!hideBg}
          onClick={openScanner}
        >
          <IonIcon icon={scanOutline} slot="start" />
          Сканировать
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProfileActivity;
