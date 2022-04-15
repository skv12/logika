import { persist } from "mobx-persist";
import { observable, computed, action } from "mobx";

export interface Categories {
    id: number,
    code: string,
    title: string
};

class Store {
   // @persist('list')
    //@observable
    //list: Categories[] = [];

    //@action
    
};
const StoreState = new Store();
export default StoreState;