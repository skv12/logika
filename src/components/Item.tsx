import { IonItem, IonLabel } from "@ionic/react";
import { Item } from "../data/store.state";

interface ContainerProps {
  item: Item;
}

const CItem: React.FC<ContainerProps> = ({ item }) => {
  return (
    <IonItem
      onClick={() => {

      }}
      href=""
    >
      <IonLabel>{item.name}</IonLabel>
      <IonLabel>{item.price}</IonLabel>
      <IonLabel>{item.quantity}</IonLabel>
    </IonItem>
  );
};

export default CItem;
