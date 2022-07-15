import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { contexts, getCategories, setCurrentCategory } from "../api/dataApi";
import { useHistory } from "react-router-dom";
import { CartItem } from "../data/data.state";
import { removeCircle } from "ionicons/icons";
// import { Route } from "workbox-routing";

interface ContainerProps {
  item: CartItem;
}

const CCartElement: React.FC<ContainerProps> = ({ item }) => {
  let history = useHistory();
  const href = `/item/${item.code}`;
  return (
    <IonItem>
      <IonLabel
        onClick={(e) => {
          e.preventDefault();
          contexts.data.appState.setItem(item.code);
          history.push(href);
        }}
      >
        {contexts.stores.itemsStore.getItem(item.code).name}
      </IonLabel>
      <IonLabel>{item.amount}</IonLabel>
      <IonIcon
        icon={removeCircle}
        onClick={(e) => {
          e.preventDefault();
          contexts.data.cartStore.removeItem(item.code);
        }}
      />
    </IonItem>
  );
};

export default CCartElement;
