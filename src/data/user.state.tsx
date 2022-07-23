export interface UserState {
  isLoggedin: boolean;
  user?: string;
  darkMode: boolean;
  loginToken?: string;
  loading: boolean;
  startupFlag: boolean;
}
