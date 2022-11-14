import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";

interface ContainerProps {
  name: string;
}

const PageHeader: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonHeader className="ion-no-border">
      <IonToolbar>
        <IonTitle class="a-center">{name}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default PageHeader;
