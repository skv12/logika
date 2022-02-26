import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonItemDivider,
  IonButton,
} from '@ionic/react';
import axios from 'axios';
import ExploreContainer from '../components/ExploreContainer';
import './loginActivity.css';
import MainActivity from './mainActivity';

const LoginActivity: React.FC = () => {
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const loginEvent = () => {
    if (login === 'admin' && password === 'admin') {
      setLogin('admin1');
    }
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonToolbar>
          <IonTitle size="large">Вход</IonTitle>
          <IonInput placeholder="Логин" type="text" value={login} onIonChange={(e) => setLogin(e.detail.value!)} />
          <IonInput placeholder="Пароль" type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
          <IonButton expand="block" onClick={() => loginEvent()}>Войти</IonButton>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default LoginActivity;
