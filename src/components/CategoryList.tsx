import { IonList, useIonViewWillLeave } from "@ionic/react";
import React from "react";
import { contexts } from "../api/dataApi";
import CCategory from "../components/Category";
import CItemElement from "./ItemElement";
interface ContainerProps {
  parent: string;
}

const CCategoryList: React.FC<ContainerProps> = ({ parent }) => {
  console.log("current category: " + parent);
  useIonViewWillLeave(() =>{
    console.log(123);
    if(contexts.data.appState.currentItem === "")
        contexts.data.appState.purgeCategory();
    else
        contexts.data.appState.purgeItem();
  }); 
  return (
    <IonList>
      {contexts.stores.categoriesStore.list.map((elem, index) => {
          if (elem.parent === parent)
            return <CCategory category={elem} key={index} />;
          else return false;
      })}
      {contexts.stores.itemsStore.list.map((elem, index) => {
        if (elem.category === parent)
        return <CItemElement item={elem} key={index} />;
        else return false;
      })}
    </IonList>
  );
};

export default CCategoryList;
