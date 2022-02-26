import React, { useState } from 'react';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import { ellipse, square, triangle } from 'ionicons/icons';
import './tabNavigator.css';

const TabNavigator: React.FC = () => (
    <IonTabs>
        <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={triangle} />
                <IonLabel>Tab 1</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={ellipse} />
                <IonLabel>Tab 2</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={square} />
                <IonLabel>Tab 3</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/tab4">
                <IonIcon icon={square} />
                <IonLabel>Tab 4</IonLabel>
            </IonTabButton>
        </IonTabBar>
    </IonTabs>
    );

export default TabNavigator;
