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
import { RouteComponentProps } from 'react-router';
import { connect } from '../api/connect';
import { loginData } from '../api/dataApi';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setLogin: typeof setLogin;
  setLoginToken: typeof setLoginToken;
}
interface LoginProps extends OwnProps,  DispatchProps { }

const LoginActivity: React.FC<LoginProps> = ({ setIsLoggedIn, history, setLogin: setLoginAction, setLoginToken: setLoginTokenAction}) => {
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
        setIsLoggedIn(true);
        history.push('/main', {direction: 'none'});
      }
      else{
        setLoginFailed(true);
      };
      //await setIsLoggedIn(true);
      //await setLoginAction(login);
      //await setLoginTokenAction(login+password)
    }
  };
  return (
    <IonPage class="loginPage">
      <form noValidate onSubmit={loginEvent}>
        {formSubmitted && loginFailed && <IonText color='danger'>
          <p className="ion-padding-start">Неправильный логин/пароль</p>
        </IonText>

        }
        <IonTitle class="loginPage__title" size="large" >Вход</IonTitle>
        
        <IonInput class="loginPage__input" placeholder="Логин" type="text" value={login} onIonChange={(e) => setLogin(e.detail.value!)} />
        {formSubmitted && loginError && <IonText color="danger">
              <p className="ion-padding-start">
                Заполните поле
              </p>
            </IonText>}
        <IonInput class="loginPage__input" placeholder="Пароль" type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
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

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setLogin,
    setLoginToken
  },
  component: LoginActivity
})
