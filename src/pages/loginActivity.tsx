import React, { useState } from 'react';
import {
  IonPage,
  IonTitle,
  IonInput,
  IonButton,
  IonText,
} from '@ionic/react';
import './loginActivity.scss';
import { setIsLoggedIn, setLogin, setLoginToken } from '../data/user.actions';
import { RouteComponentProps } from 'react-router';
import { connect } from '../api/connect';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setLogin: typeof setLogin;
  setLoginToken: typeof setLoginToken;
}
interface LoginProps extends OwnProps,  DispatchProps { }

const LoginActivity: React.FC<LoginProps> = ({ setIsLoggedIn, setLogin: setLoginAction, setLoginToken: setLoginTokenAction}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

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
      await setIsLoggedIn(true);
      await setLoginAction(login);
      await setLoginTokenAction(login+password)
    }
  };
  return (
    <IonPage class="loginPage">
      <form noValidate onSubmit={loginEvent}>
        <IonTitle class="loginPage__title" size="large" >Вход</IonTitle>
        <IonInput class="loginPage__input" placeholder="Логин" type="text" value={login} onIonChange={(e) => setLogin(e.detail.value!)} />
        {formSubmitted && loginError && <IonText color="danger">
              <p className="ion-padding-start">
                Неправильный логин
              </p>
            </IonText>}
        <IonInput class="loginPage__input" placeholder="Пароль" type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
        {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Неправильный пароль
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
