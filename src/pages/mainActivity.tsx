import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonItemDivider,
  IonButton,
} from '@ionic/react';
import axios from 'axios';

import ExploreContainer from '../components/ExploreContainer';
import './mainActivity.css';
import LoginActivity from './loginActivity';
import Tab1 from './Tab1';

const MainActivity: React.FC = () => {
    const [auth, setAuth] = useState(true);
    if(!auth) return(
        <LoginActivity/>
    )
    else return (

    <Tab1/>
  );
};

export default MainActivity;
