import React, { useState } from 'react';

import {
  IonPage,
  IonTitle,
  IonInput,
  IonButton,
  IonText,
  IonLoading,
} from '@ionic/react';
import './LoginActivity.scss';
import { setIsLoggedIn, setLoading, setLogin, setLoginToken } from '../data/user.actions';
import { connect } from '../api/connect';
import { contexts, loginData } from '../api/dataApi';

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setLogin: typeof setLogin;
  setLoginToken: typeof setLoginToken;
}
interface LoginProps extends DispatchProps { }
function refreshPage(){ 
  window.location.reload(); 
}
const LoginActivity: React.FC<LoginProps> = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginFailed,setLoginFailed] = useState(false);
  const loginEvent = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setFormSubmitted(true);
    if (!login) {
      setLoading(false);
      setLoginError(true);
    }
    if (!password) {
      setLoading(false);
      setPasswordError(true);
    }
    if (login && password) {
      if(await loginData("auth", login, password)){
        setLoginFailed(true ? false : false);
        setLoading(false);
        refreshPage();
      }
      else{
        setLoading(false);
        setLoginFailed(true);
      };
    }
  };
  return (
    <IonPage className="loginPage">
      <IonLoading
        isOpen={contexts.data.appState.isLoading}
        message={"Загрузка..."}
      />
      <form noValidate onSubmit={loginEvent}>
        {formSubmitted && loginFailed && <IonText color='danger'>
          <p className="ion-padding-start">Неправильный логин/пароль</p>
        </IonText>

        }
        <IonTitle className="loginPage__title" size="large" >Вход</IonTitle>
        
        <IonInput className="loginPage__input" placeholder="Логин" type="text" value={login} onIonChange={(e) => setLogin(e.detail.value!)} />
        {formSubmitted && loginError && <IonText color="danger">
              <p className="ion-padding-start">
                Заполните поле
              </p>
            </IonText>}
        <IonInput className="loginPage__input" placeholder="Пароль" type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
        {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Заполните поле
              </p>
            </IonText>}
        <IonButton type="submit" expand="block">Войти</IonButton>
      </form>
    </IonPage>
  );
};

export default connect<{}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setLogin,
    setLoginToken
  },
  component: LoginActivity
})
