import { combineReducers } from './combineReducers';
import { userReducer } from '../data/user.reduser';

export const initialState: AppState = {
  data:{
    categories: [],
    items: [],
    loading: false
  },
  user: {
    darkMode: false,
    isLoggedin: false,
    loading: false
  }
};

export const reducers = combineReducers({
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;