import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonPage,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { scanOutline, stopCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { contexts, getItemCode } from "../api/dataApi";
import "./ScannerActivity.scss";

const ScannerActivity: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [message2, setMessage2] = useState("");
  const [hideBg, setHideBg] = useState("");
  let history = useHistory();
  const openScanner = async () => {
    BarcodeScanner.hideBackground();
    document.body.style.opacity="0";
    document.body.style.background = "transparent";
    setHideBg("hideBg");
    const data = await BarcodeScanner.startScan();
    if(data.content){
      getItemCode(data.content);
      BarcodeScanner.showBackground()
      document.body.style.opacity="1";
      document.body.style.background = "";
      stopScan();
      const href = `/item/${contexts.data.appState.scannedItem}`;
      contexts.data.appState.setItem(contexts.data.appState.scannedItem);
      history.push(href);
    }
      
  };
  const test = async () => {
      console.log(contexts.data.appState.scannedItem);
      const href = `/item/${contexts.data.appState.scannedItem}`;
      contexts.data.appState.setItem(contexts.data.appState.scannedItem);
      history.push(href);      
  };
  const stopScan = () => {
    BarcodeScanner.showBackground()
    document.body.style.opacity="1";
    document.body.style.background = "";
    BarcodeScanner.stopScan()
    setHideBg("")
  }
  //const [present] = useIonAlert()
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const status = await BarcodeScanner.checkPermission({ force: true })

        if (status.granted) {
          return true
        }
        if (status.denied) {
            // const c = confirm(
            //   'If you want to grant permission for using your camera, enable it in the app settings.',
            // );
            // if (c) {
            //   BarcodeScanner.openAppSettings();
            // }
          }

        return false
      } catch (error) {
        setMessage2("Ошибка прав");
        setShowToast(true);
      }
    }

    checkPermission()

    return () => {}
  }, [])
  return (
    <IonPage>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message = {message2}
            duration={3500}
          />
      {/* <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton color="danger" hidden={!hideBg} onClick={stopScan}>
              <IonIcon icon={stopCircleOutline} slot="start" />
              Stop Scan
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader> */}
      <IonContent className="hideBg">
        <IonButton
          className="start-scan-button"
          hidden={!!hideBg}
          onClick={openScanner}
        >
          <IonIcon icon={scanOutline} slot="start" />
          Сканировать
        </IonButton>
        <IonButton
          onClick={() => {getItemCode("80357699206759"); test();}}
        >
          <IonIcon icon={scanOutline} slot="start" />
          Проверка
        </IonButton>
        <IonToolbar className="scan-toolbar">
          <IonButtons slot="end">
            <IonButton color="danger" hidden={!hideBg} onClick={stopScan}>
              <IonIcon icon={stopCircleOutline} slot="start" />
              Stop Scan
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default ScannerActivity;
