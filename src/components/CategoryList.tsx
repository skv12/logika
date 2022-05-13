import {
    IonContent,
    IonList,
  } from "@ionic/react";
  import React from "react";
  import { contexts } from "../api/dataApi";
  import CCategory from "../components/Category";
  interface ContainerProps {
    url?: string;
  }
  const CCategoryList: React.FC<ContainerProps> = ({url}) => {
   // let { cat } = getCurrectCategory();
   console.log(contexts.stores.categoriesStore.list);
    return (
        <IonContent fullscreen>
          <IonList>
          {
          contexts.stores.categoriesStore.list.map(elem => {
            //console.log(elem);
            if(url)
                if(elem.parent === url)
                    return(<CCategory category={elem}/>)
                else
                    return 0;
            else
                return(<CCategory category={elem}/>)
          })
          }
          </IonList>
        </IonContent>
    );
  };
  
  export default CCategoryList;
  