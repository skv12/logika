
import { getUserData, setIsLoggedInData, setLoginTokenData } from '../api/dataApi';
import { setLoginData } from '../api/dataApi';
import { ActionType } from '../api/types';
import { UserState } from './user.state';


export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getUserData();
  dispatch(setData(data));
  dispatch(setLoading(false));
}
export const setLoading = (isLoading: boolean) => ({
  type: 'set-user-loading',
  isLoading
} as const);

export const setData = (data: Partial<UserState>) => ({
  type: 'set-user-data',
  data
} as const);

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(false);
  dispatch(setLoginToken());
};

export const setIsLoggedIn = (loggedIn: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(loggedIn);
  return ({
    type: 'set-is-loggedin',
    loggedIn
  } as const)
};

export const setLogin = (login?: string) => async (dispatch: React.Dispatch<any>) => {
  await setLoginData(login);
  return ({
    type: 'set-login',
    login
  } as const);
};

export const setLoginToken = (loginToken?: string) => async (dispatch: React.Dispatch<any>) => {
  await setLoginTokenData(loginToken);
  return ({
    type: 'set-login-token',
    loginToken
  } as const);
} 

export const setDarkMode = (darkMode: boolean) => ({
  type: 'set-dark-mode',
  darkMode
} as const);

export const setStartupFlag = (startupFlag: boolean) => ({
  type: 'set-startup-flag',
  startupFlag
} as const);
export type UserActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setLogin>
  | ActionType<typeof setLoginToken>
  | ActionType<typeof setDarkMode>
  | ActionType<typeof setStartupFlag>