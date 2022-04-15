import { IonItem, IonLabel } from "@ionic/react";

interface ContainerProps {
  name: string;
}

const Item: React.FC<ContainerProps> = ({ name }) => {
  return (
      <IonItem>
          <IonLabel>
          </IonLabel>
      </IonItem>
  );
};

export default Item;
