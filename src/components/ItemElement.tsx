import { IonItem, IonLabel } from "@ionic/react";
import { contexts } from "../api/dataApi";
import { Item } from "../data/store.state";

interface ContainerProps {
  item: Item;
}

const CItemElement: React.FC<ContainerProps> = ({ item }) => {
  return (
    <IonItem
      onClick={(e) => {
        contexts.data.appState.setItem(item.code);
      }}
      routerDirection={"forward"}
      routerLink={`/item/${item.code}`}
    >
      <IonLabel>{item.name}</IonLabel>
      <IonLabel>{item.code}</IonLabel>
    </IonItem>
  );
};

export default CItemElement;
