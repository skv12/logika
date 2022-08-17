import { IonCol, IonIcon, IonItem, IonLabel, IonRow } from "@ionic/react";
import { folderOpenOutline } from "ionicons/icons";
import { contexts } from "../api/dataApi";
import { Category } from "../data/store.state";

interface ContainerProps {
  category: Category;
}

const CCategory: React.FC<ContainerProps> = ({ category }) => {
  return (
    <IonItem
      className="folder"
      onClick={(e) => {
        contexts.data.appState.setCategory(category.code);
      }}
      routerDirection={"forward"}
      routerLink={`/main/${category.code}`}
    >
      <IonRow>
        <IonCol>
          <IonIcon icon={folderOpenOutline} />
        </IonCol>
        <IonCol>
          <IonLabel>{category.name}</IonLabel>
        </IonCol>
      </IonRow>
    </IonItem>
  );
};

export default CCategory;
