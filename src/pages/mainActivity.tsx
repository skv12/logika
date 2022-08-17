import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonContent,
  IonButtons,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonLoading,
  IonButton,
  IonIcon,
  IonBackButton,
} from "@ionic/react";
import {
  searchOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import {
  contexts,
  getCategories,
  getItems,
  getStores,
} from "../api/dataApi";
import CCategoryList from "../components/CategoryList";
import { setLoading } from "../data/user.actions";
import "./MainActivity.scss";
interface ContainerProps {
  category: string;
}
function doRefresh(event: CustomEvent<RefresherEventDetail>) {
  getStores();
  getCategories();
  getItems();
  setCategory("0");
  setTimeout(() => {
    console.log("Async operation has ended");
    event.detail.complete();
  }, 2000);
}
function setCategory(category: string) {
  return <CCategoryList parent={category} />;
}

const MainActivity: React.FC<ContainerProps> = ({ category }) => {
  const [store, setStore] = useState<string>("Все");
  console.log(contexts.data.appState.previousCategories);
  useEffect(() => {
    setLoading(true);
    getStores();
    getCategories();
    getItems();
    setLoading(false);
  }, []);
  return (
    <IonPage>
      <IonLoading
        isOpen={contexts.data.appState.isLoading}
        message={"Загрузка..."}
        spinner="circles"
      />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>

          <IonButtons slot="primary">
            <IonText>Склад</IonText>
            <IonSelect
              value={store}
              onIonChange={(e) => setStore(e.detail.value)}
              interface="action-sheet"
              slot="end"
            >
              <IonSelectOption value={"Все"}>Все</IonSelectOption>
              {contexts.stores.stocksStore.list.map((elem) => {
                return (
                  <IonSelectOption value={elem.stores} key={elem.stores}>
                    {elem.stores} ({elem.priceType})
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton slot="icon-only" routerLink="/search" routerDirection={"forward"}>
              <IonIcon icon={searchOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen id="root" scrollY={false}>
        <IonRefresher
          slot="fixed"
          onIonRefresh={doRefresh}
          pullFactor={0.5}
          pullMin={100}
          pullMax={200}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {setCategory(category)}
      </IonContent>
    </IonPage>
  );
};

export default MainActivity;
