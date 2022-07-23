import { IonBackButton } from "@ionic/react";

interface ContainerProps{}
const BackButton: React.FC<ContainerProps> = () =>{
    // if(contexts.data.appState.currentItem === "")
    //     contexts.data.appState.purgeCategory();
    // else
    //     contexts.data.appState.purgeItem();
    return (
        <IonBackButton></IonBackButton>
    );
}
export default BackButton;