import { IonList } from "@ionic/react";
import { item_type } from "../pages/Store";
import ItemElement from "./ItemElement";

interface ContainerProps {
  goods: Array<item_type>;
}

const ItemList: React.FC<ContainerProps> = ({ goods }) => {
  return (
    <IonList className="ion-padding">
      {goods.map((elem, index) => {
        return <ItemElement goods={elem} key={index} />;
      })}
    </IonList>
  );
};

export default ItemList;
