import { IonItem, IonLabel } from "@ionic/react";

interface ContainerProps {
  name: string;
}

const Category: React.FC<ContainerProps> = ({ name }) => {
  return (
      <IonItem>
          <IonLabel>
              {name}
          </IonLabel>
      </IonItem>
  );
};

export default Category;
