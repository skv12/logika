import React, { useState } from 'react';

import {
  IonPage,
  IonTitle,
  IonInput,
  IonButton,
  IonText,
} from '@ionic/react';
import './LoginActivity.scss';
import { setIsLoggedIn, setLogin, setLoginToken } from '../data/user.actions';
import { useParams } from 'react-router-dom';
import { connect } from '../api/connect';
import { loginData } from '../api/dataApi';

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
    e.preventDefault();
    
    setFormSubmitted(true);
    if (!login) {
      setLoginError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (login && password) {
      if(await loginData("auth", login, password)){
        setLoginFailed(true ? false : false);
        refreshPage();
      }
      else{
        setLoginFailed(true);
      };
    }
  };
  return (
    <IonPage className="loginPage">
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
