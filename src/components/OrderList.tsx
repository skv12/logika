import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import React, { useState } from "react";
import { contexts } from "../api/dataApi";
import { Order } from "../data/store.state";
import COrderElement from "./OrderElement";
interface ContainerProps {}

const COrderList: React.FC<ContainerProps> = () => {
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [data, setData] = useState<Order[]>([]);
  const pushData = () => {
    let max = data.length + 100;
    let min = max - 100;
    if (max > contexts.stores.ordersStore.list.length) {
      min = data.length;
      max = contexts.stores.ordersStore.list.length;
    }
    
    const newData = [];
    for (let i = min; i < max; i++) {
      newData.push(contexts.stores.ordersStore.list[i]);
    }
    setData([...data, ...newData]);
  };
  const loadData = (ev: any) => {
    setTimeout(() => {
      if (data.length === contexts.stores.ordersStore.list.length) {
        setInfiniteDisabled(true);
      } else {
        pushData();
        ev.target.complete();
      }
    }, 500);
  };

  useIonViewWillEnter(() => {
    pushData();
  });
  useIonViewWillLeave(() => {
    contexts.data.appState.purgeOrder();
  });
  return (
    <>
      <IonList>
        {data.map((elem, index) => {
          return <COrderElement order={elem} key={index} />;
        })}
      </IonList>
      <IonInfiniteScroll
        onIonInfinite={loadData}
        threshold="100px"
        disabled={isInfiniteDisabled}
      >
        <IonInfiniteScrollContent
          loadingSpinner="crescent"
          loadingText="Загрузка..."
        ></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </>
  );
};

export default COrderList;
