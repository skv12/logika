import { Storage } from '@capacitor/storage';

const HAS_LOGGED_IN = 'hasLoggedIn';
const LOGIN_TOKEN = 'loginToken';
const LOGIN = 'login';

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: LOGIN_TOKEN }),
    Storage.get({ key: LOGIN })]);
  const isLoggedin = await response[0].value === 'true';
  const loginToken = await response[1].value || undefined;
  const login = await response[2].value || undefined;
  const data = {
    isLoggedin,
    loginToken,
    login
  };
  console.log(isLoggedin);
  console.log(loginToken);
  console.log(login);
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setLoginTokenData = async (loginToken?: string) => {
  await Storage.set({ key: LOGIN_TOKEN, value: JSON.stringify(loginToken) });
}

export const setLoginData = async (login?: string) => {
  if (!login) {
    await Storage.remove({ key: LOGIN });
  } else {
    await Storage.set({ key: LOGIN, value: login });
  }
}
