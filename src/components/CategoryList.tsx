import { IonContent, IonList } from "@ionic/react";
import React from "react";
import { contexts } from "../api/dataApi";
import CCategory from "../components/Category";
interface ContainerProps {
  parent?: string;
}
const CCategoryList: React.FC<ContainerProps> = ({ parent }) => {
  // let { cat } = getCurrectCategory();
  console.log(contexts.stores.categoriesStore.list);
  return (
      <IonList>
        {contexts.stores.categoriesStore.list.map((elem, index) => {
          console.log(parent);
          if (parent)
            if (elem.parent === parent) 
              return <CCategory category={elem} key={index}/>;
            else return 0;
          else return <CCategory category={elem} key={elem.code}/>;
        })}
      </IonList>
  );
};

export default CCategoryList;
