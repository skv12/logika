import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import COrderList from '../components/OrderList';
import './Tab3.css';

const SalesActivity: React.FC = () => {
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
        <COrderList/>
      </IonContent>
    </IonPage>
  );
};

export default SalesActivity;
