import { IonList, useIonViewWillLeave } from "@ionic/react";
import React from "react";
import { contexts } from "../api/dataApi";
import COrderElement from "./OrderElement";
interface ContainerProps {
}

const COrderList: React.FC<ContainerProps> = () => { 
    useIonViewWillLeave(() =>{
        contexts.data.appState.purgeOrder();
      }); 
  return (
    <IonList>
      {contexts.stores.ordersStore.list.map((elem, index) => {
        return <COrderElement order={elem} key={index} />;
      })}
    </IonList>
  );
};

export default COrderList;
