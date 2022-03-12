import { Route } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import {IonApp} from '@ionic/react';



//import TabNavigator from './routers/tabNavigator';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { IonReactRouter } from '@ionic/react-router';
import LoginActivity from './pages/loginActivity';
import TabNavigator from './routers/tabNavigator';

interface IUserManager {
  setLogin: Function;
}

const user: IUserManager = {
  setLogin: () => {}
};

export const UserContext = React.createContext<IUserManager>(user);
const Start: React.FC = () =>{
  const [login, setLogin] = useState(false);
  const user = useContext(UserContext);
  
  user.setLogin = setLogin;
  return (
    <IonApp>
      <IonReactRouter>
          <Route path="/login" component={LoginActivity} exact={true}/>
          <Route path="/" component={login ? TabNavigator : LoginActivity}/>
      </IonReactRouter>
    </IonApp>
  );
}

const App: React.FC = () =>  {
  return (
    <UserContext.Provider value={user}>
      <Start />
    </UserContext.Provider>
  );
}

export default App;
