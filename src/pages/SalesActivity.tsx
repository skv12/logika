import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import { useState } from "react";
import { addOrder, contexts } from "../api/dataApi";
import CCartList from "../components/CartList";
import "./Tab3.css";

interface HomePageProps {
  router: HTMLIonRouterOutletElement | null;
}


const SalesActivity: React.FC<HomePageProps> = ({ router }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Продажи</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Продажи</IonTitle>
          </IonToolbar>
        </IonHeader>
        <CCartList />
        {!contexts.data.cartStore.cartIsEmpty && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton
              onClick={(e) => {
                e.preventDefault();
                addOrder();
              }}
            >
              <IonIcon icon={cartOutline} />
            </IonFabButton>
          </IonFab>
        )}
        <IonModal
          isOpen={showModal}
          swipeToClose={true}
          presentingElement={router || undefined}
          onDidDismiss={() => setShowModal(false)}>
          <p>This is modal content</p>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default SalesActivity;
