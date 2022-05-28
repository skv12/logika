import { IonItem, IonLabel } from "@ionic/react";
import { contexts, getCategories, setCurrentCategory } from "../api/dataApi";
import { Category, Item } from "../data/store.state";
import { useHistory } from "react-router-dom";
// import { Route } from "workbox-routing";

interface ContainerProps {
  item: Item;
}

const CItemElement: React.FC<ContainerProps> = ({ item }) => {
  let history = useHistory();
  // // const routeChange = async (code: string) =>{
  // //   let path = "/main/" + code;
  // //   history.push(path);
  // // }
  // let url = useRouteMatch();
  const href = `/item/${item.code}`;
  return (
    <IonItem
      onClick={(e) => {
        e.preventDefault();
        contexts.data.appState.setItem(item.code);
        //setCurrentCategory(category.code);
        history.push(href);
      }}
    >
      <IonLabel>{item.name}</IonLabel>
      <IonLabel>{item.code}</IonLabel>
    </IonItem>
  );
};

export default CItemElement;
