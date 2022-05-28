import { IonItem, IonLabel } from "@ionic/react";
import { contexts, getCategories, getItems, setCurrentCategory } from "../api/dataApi";
import { Category } from "../data/store.state";
import { useHistory } from "react-router-dom";
// import { Route } from "workbox-routing";

interface ContainerProps {
  category: Category;
}

const CCategory: React.FC<ContainerProps> = ({ category }) => {
  let history = useHistory();
  // // const routeChange = async (code: string) =>{
  // //   let path = "/main/" + code;
  // //   history.push(path);
  // // }
  // let url = useRouteMatch();
  const href = `/main/${category.code}`;
  return (
    <IonItem className="folder"
      onClick={() => {
        contexts.data.appState.setCategory(category.code);
        //setCurrentCategory(category.code);
        history.push(href);
      }}
    >
      <IonLabel>{category.name}</IonLabel>
      <IonLabel>{category.code}</IonLabel>
    </IonItem>
  );
};

export default CCategory;
