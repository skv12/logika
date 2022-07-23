import { UserActions } from "./user.actions";
import { UserState } from "./user.state";

export function userReducer(state: UserState, action: UserActions): UserState {
  switch (action.type) {
    case "set-user-loading":
      return { ...state, loading: action.isLoading };
    case "set-user-data":
      return { ...state, ...action.data };
    case "set-login":
      return { ...state, user: action.user };
    case "set-login-token":
      return { ...state, loginToken: action.loginToken };
    case "set-dark-mode":
      return { ...state, darkMode: action.darkMode };
    case "set-is-loggedin":
      return { ...state, isLoggedin: action.loggedIn };
      case "set-startup-flag":
      return { ...state, startupFlag: action.startupFlag };
  }
}
