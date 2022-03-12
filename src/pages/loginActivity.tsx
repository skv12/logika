import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
} from '@ionic/react';
import './loginActivity.css';

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
      <IonContent>
        <IonToolbar>
          <IonTitle size="large">Вход</IonTitle>
          <IonInput class="loginPage--input" placeholder="Логин" type="text" value={login} onIonChange={(e) => setLogin(e.detail.value!)} />
          <IonInput class="loginPage--input" placeholder="Пароль" type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
          <IonButton expand="block" onClick={() => loginEvent()}>Войти</IonButton>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default LoginActivity;
