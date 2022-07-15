import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import COrderList from '../components/OrderList';
import './Tab2.css';

const StatsActivity: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Статистика</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Статистика</IonTitle>
          </IonToolbar>
        </IonHeader>
        <COrderList/>
      </IonContent>
    </IonPage>
  );
};

export default StatsActivity;
