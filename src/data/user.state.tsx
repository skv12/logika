export interface UserState {
  isLoggedin: boolean;
  login?: string;
  darkMode: boolean;
  loginToken?: string;
  loading: boolean;
  startupFlag: boolean;
}
