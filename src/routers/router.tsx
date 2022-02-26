import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Tab1 from '../pages/Tab1';
import Tab2 from '../pages/Tab2';
import Tab3 from '../pages/Tab3';
import Tab4 from '../pages/Tab4';
import LoginActivity from '../pages/loginActivity';
import MainActivity from '../pages/mainActivity';

const RouterNavigator: React.FC = () => (
    <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/main">
            <MainActivity />
          </Route>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route exact path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/tab4">
            <Tab4 />
          </Route>
          <Route exact path="/">
            <Redirect to="/main" />
          </Route>
          <Route exact path="/login">
            <LoginActivity />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    );

export default RouterNavigator;
