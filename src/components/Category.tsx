import { IonItem, IonLabel } from "@ionic/react";
import { getCategories } from "../api/dataApi";
import { Category } from "../data/store.state";
import { useHistory } from "react-router-dom";

interface ContainerProps {
  category: Category;
}

const CCategory: React.FC<ContainerProps> = ({category}) => {
  let history = useHistory(); 
  const routeChange = async (code: string) =>{ 
    let path = "/main/" + code; 
    history.push(path);
  }
  return (
      <IonItem onClick={() => {getCategories(category.name); routeChange(category.code);}}>
          <IonLabel>
            {category.name}
          </IonLabel>
          <IonLabel>
            {category.code}
          </IonLabel>
      </IonItem>
  );
};

export default CCategory;
