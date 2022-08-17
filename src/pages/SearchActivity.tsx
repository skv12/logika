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
  IonTitle,
  IonInput,
  IonToggle,
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
  IonBackButton,
  IonList,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { contexts, getCategories, getItems, getStores } from "../api/dataApi";
import "./MainActivity.scss";

const SearchActivity: React.FC = () => {
  const handleSearch = (e: string) => {
    if (nameCheck) contexts.stores.itemsStore.filter = e;
    console.log(e);
  };
  const [nameCheck, setNameChecked] = useState(true);
  const [articulCheck, setArticulChecked] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Поиск</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonInput
                placeholder=""
                color="primary"
                inputMode="search"
                onIonChange={(e) => {
                  if (e.target.value === undefined) return;
                  handleSearch(e.detail.value!);
                }}
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel>Поиск по</IonLabel>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>Названию</IonLabel>
              <IonToggle
                checked={nameCheck}
                onIonChange={(e) => setNameChecked(e.detail.checked)}
              />
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel>Артикул</IonLabel>
              <IonToggle
                checked={articulCheck}
                onIonChange={(e) => setArticulChecked(e.detail.checked)}
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonList>
        {/* {contexts.stores.itemsStore.filter((elem, index) => {
              if (elem.category === parent)
                return <CItemElement item={elem} key={index} />;
              else return false;
            })} */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SearchActivity;
