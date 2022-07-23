import { IonItem, IonLabel } from "@ionic/react";
import { contexts } from "../api/dataApi";
import { Order } from "../data/store.state";
import { useHistory } from "react-router-dom";
// import { Route } from "workbox-routing";

interface ContainerProps {
  order: Order;
}

const COrderElement: React.FC<ContainerProps> = ({ order }) => {
  let history = useHistory();
  // // const routeChange = async (code: string) =>{
  // //   let path = "/main/" + code;
  // //   history.push(path);
  // // }
  // let url = useRouteMatch();
  const href = `/sales/${order.id}`;
  return (
    <IonItem
      onClick={(e) => {
        e.preventDefault();
        contexts.data.appState.setOrder(order.id);
        history.push(href);
      }}
    >
      <IonLabel>{order.name}</IonLabel>
      <IonLabel>{order.id}</IonLabel>
    </IonItem>
  );
};

export default COrderElement;
