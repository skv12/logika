import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';

import './mainActivity.scss';

const MainActivity: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Главное</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Главное</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Главное" />
      </IonContent>
    </IonPage>
  );
};

export default MainActivity;
