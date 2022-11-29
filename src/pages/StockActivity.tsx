import React, { useEffect, useRef, useState } from "react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { AndroidSettings, NativeSettings } from "capacitor-native-settings";
import { ReactTree } from "@naisutech/react-tree";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAlert,
  IonRow,
  IonText,
  IonCol,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonModal,
  IonButtons,
  useIonModal,
} from "@ionic/react";
import "./StockActivity.scss";
import clearIcon from "../res/trash.svg";
import filterIcon from "../res/filter.svg";
import scanIcon from "../res/camera.svg";
import searchIcon from "../res/search.svg";
import { Store } from "./Store";
import {
  cartOutline,
  closeOutline,
  checkmarkOutline,
  layersOutline,
} from "ionicons/icons";
import ItemList from "../components/ItemList";
import Basket from "../components/Basket";
import { OverlayEventDetail } from "@ionic/core/components";
import {
  getGoods,
  getCategory,
  StoreToString,
  getStores,
} from "../data/DataApi";

const StockActivity: React.FC = () => {
  const refe = useRef(null);
  const [b_length, setBLength] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [scanActive, setScanActive] = useState(false);
  const [stores, setStores] = useState(false);
  const [present, dismiss] = useIonModal(Basket, {
    itemCount: b_length,
    onDismiss: () => dismiss(),
  });

  function openBasket() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {},
    });
  }
  useEffect(() => {
    getCategory();
    getStores();
  }, []);

  const startScan = async () => {
    const status = await BarcodeScanner.checkPermission({
      force: true,
    });
    if (status.granted) {
      setScanActive(true);
      BarcodeScanner.hideBackground();
      const data = await BarcodeScanner.startScan();
      if (data.content) {
        setSearchText(data.content);
        BarcodeScanner.showBackground();
        setScanActive(false);
        BarcodeScanner.stopScan();
      }
    }
    if (status.denied) {
      NativeSettings.openAndroid({
        option: AndroidSettings.Security,
      });
    }
  };
  const [grouplist, setGrouplist] = useState(false);

  Store.subscribe_basket(() => {
    let basket = Store.getState().basket;
    let sum = 0;
    if (basket !== undefined)
      basket.forEach((info) => {
        sum = sum + info.Количество;
      });
    setBLength(sum);
  });

  useEffect(() => {
    Store.dispatch({ type: "p1", Номенклатура: searchText });
    getGoods(Store.getState().param1);
  }, [searchText]);
  const setStore = async (data) => {
    Store.dispatch({ type: "set_stock", data: false });
    data.forEach((e) => {
      Store.dispatch({ type: "upd_stock", value: e, checked: true });
    });
    Store.dispatch({ type: "p1", Склады: StoreToString() });
    Store.dispatch({ type: "list_stock" });
  };

  return (
    <IonPage>
      <IonHeader
        hidden={scanActive}
        className="headerCustom ion-no-border ion-padding-horizontal"
      >
        <IonToolbar>
          <IonTitle className="a-center">Остатки</IonTitle>
          <IonButtons slot="end">
            <IonButton
              fill="clear"
              onClick={() => {
                setStores(true);
              }}
            >
              <IonIcon icon={layersOutline}></IonIcon>
            </IonButton>
            <IonButton
              fill="clear"
              onClick={() => {
                openBasket();
              }}
            >
              <IonIcon
                className="cartIcon"
                slot="icon-only"
                icon={cartOutline}
              />
              <IonText class="red-1"> {b_length} </IonText>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonSearchbar
          value={searchText}
          searchIcon={searchIcon}
          onIonChange={(e) => {
            setSearchText(e.detail.value!);
          }}
          className="searchbar"
          placeholder="Поиск"
          ref={refe}
        >
          <IonButton
            className="searchbar-camera"
            color="none"
            onClick={() => {
              startScan();
            }}
          >
            <IonIcon slot="icon-only" icon={scanIcon} color="primary" />
          </IonButton>
        </IonSearchbar>
        <IonRow>
          <IonCol className="ion-no-padding">
            <IonButton
              fill="clear"
              onClick={() => {
                Store.dispatch({
                  type: "p1",
                  Номенклатура: "Без номенклатуры",
                  Группа: "",
                });
                Store.dispatch({ type: "gr_del" });
                getGoods(Store.getState().param1);
              }}
            >
              <IonIcon
                icon={clearIcon}
                slot="icon-only"
                color="primary"
              ></IonIcon>
              Очистить
            </IonButton>
          </IonCol>
          <IonCol className="filter ion-no-padding">
            <IonButton
              fill="clear"
              onClick={() => {
                setGrouplist(true);
              }}
            >
              <IonIcon slot="icon-only" icon={filterIcon}></IonIcon>
              Фильтр
            </IonButton>
          </IonCol>
        </IonRow>
      </IonHeader>

      <IonContent hidden={scanActive}>
        <ItemList goods={Store.getState().goods} />
      </IonContent>

      <IonModal isOpen={grouplist}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Группы товаров</IonTitle>
            <IonButton
              fill="clear"
              slot="start"
              onClick={() => {
                setGrouplist(false);
                Store.dispatch({ type: "p1", Группа: "" });
              }}
            >
              <IonIcon slot="icon-only" icon={closeOutline}></IonIcon>
            </IonButton>
            <IonButton
              fill="clear"
              slot="end"
              onClick={() => {
                setGrouplist(false);
                Store.dispatch({ type: "p1", Номенклатура: "" });
                setSearchText("");
                getGoods(Store.getState().param1);
              }}
            >
              <IonIcon slot="icon-only" icon={checkmarkOutline}></IonIcon>
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <ReactTree
            nodes={Store.getState().categories}
            onToggleSelectedNodes={(e) => {
              Store.dispatch({ type: "p1", Группа: e[0] });
            }}
          />
        </IonContent>
      </IonModal>
      <IonAlert
        isOpen={stores}
        onDidDismiss={() => setStores(false)}
        header={"Склады"}
        message={""}
        inputs={Store.getState().stores}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {},
          },
          {
            text: "Ok",
            handler: (data) => {
              setStore(data);
            },
          },
        ]}
      />
    </IonPage>
  );
};

export default StockActivity;
