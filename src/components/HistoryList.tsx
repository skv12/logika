import {
  IonList,
} from "@ionic/react";
import { h_type } from "../pages/Store";
import HistoryElement from "./HistoryElement";

interface ContainerProps {
  items: Array<h_type>;
}

const HistoryList: React.FC<ContainerProps> = ({ items }) => {
  return (
    <IonList className="ion-padding">
      {items.map((elem, index) => {
        return <HistoryElement item={elem} key={index} />;
      })}
    </IonList>
  );
};

export default HistoryList;
