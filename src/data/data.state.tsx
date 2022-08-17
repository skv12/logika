import { observable, action, makeObservable, computed } from "mobx";
import { contexts } from "../api/dataApi";
import { ErrorType } from "../api/types";

export interface CartItem {
  code: string;
  amount: number;
  name: string;
  price: number;
  priceType: string;
  sum: number;
}
export interface CListState<CartList extends CartItem> {
  results: CartList[];
  count?: number;
  isLoading?: boolean;
  error?: ErrorType;
}
export class CartStore<StockList extends CartItem> {
  @observable
  cartIsEmpty = true;

  @observable
  protected cart: CListState<StockList> = {
    results: [],
  };
  constructor() {
    makeObservable<CartStore<StockList>>(this);
  }

  get list(): CartItem[] {
    return Array.isArray(this.cart.results) ? this.cart.results : [];
  }
  
  @action
  cartIsEmptyChecker(){
    if(this.list.length > 0){
      this.cartIsEmpty = false;
    }
    else
      this.cartIsEmpty = true;
  }

  @action
  addItem(item: string, amount: number) {
    const isItemInCart = this.list.find((element) => element.code === item);
    if (isItemInCart) {
      this.updateItem(item);
    } else {
      var i: CartItem = { 
        code: item, 
        amount: amount, 
        name: contexts.stores.itemsStore.getItem(item).name, 
        price: contexts.stores.itemsStore.getItem(item).price, 
        priceType: contexts.stores.itemsStore.getItem(item).priceType, 
        sum: contexts.stores.itemsStore.getItem(item).price*amount};
      this.list.push(i);
    }
    this.cartIsEmptyChecker();
  }
  @action
  getItem(code: string) {
    var i = this.list.find((element) => {
      return element.code === code;
    });
    if (i) return i?.amount;
    else return 1;
  }
  @action
  updateItem(item: string) {
    return this.list.map((element) =>
      element.code === item ? { ...element, amount: element.amount + 1 } : item
    );
  }

  @action
  removeItem(item: string) {
    for (let e of this.list) {
      if (e.code === item) {
        const indexOf = this.list.indexOf(e);
        this.list.splice(indexOf, 1);
      }
    }
    this.cartIsEmptyChecker();
  }

  @computed get totalItems() {
    return this.list.reduce((prev, item) => prev + item.amount, 0);
  }
}

export class AppState {
  @observable
  currentCategory = "0";

  @observable
  cartIsEmpty = true;

  @observable
  previousCategories: string[] = [];

  @observable
  isLoading = false;

  @observable
  currentItem = "";

  @observable
  currentOrder = "";

  @observable
  firstInit = false;

  @observable
  firstItemInit = true;

  @observable
  scannedItem = "";

  @observable
  url = "";
  constructor() {
    makeObservable<AppState>(this);
  }
  @action
  setIsLoading(loadingState: boolean){
    this.isLoading = loadingState;
  }
  @action
  setFirstInit() {
    this.firstInit = true;
  }

  @action
  setFirstItemInit() {
    this.firstItemInit = false;
  }

  @action
  setCategory(category: string) {
    this.previousCategories.push(this.currentCategory);
    this.currentCategory = category;
    console.log(this.currentCategory);
  }

  @action
  setItem(item: string) {
    this.currentItem = item;
    console.log(this.currentItem);
  }

  @action
  setOrder(order: string) {
    this.currentOrder = order;
    console.log(this.currentOrder);
  }
  @action
  purgeCategory() {
    console.log(this.previousCategories);
    const popped = this.previousCategories[this.previousCategories.length - 1];
    this.previousCategories.splice(-1);
    if (popped === undefined) this.currentCategory = "0";
    else this.currentCategory = popped;
    console.log(this.previousCategories);
  }
  @action
  purgeItem() {
    this.currentItem = "";
    console.log(this.currentItem);
  }
  @action
  purgeOrder() {
    this.currentOrder = "";
    console.log(this.currentOrder);
  }
  setScannedItem(item: string){
    this.scannedItem = item;
  }
  purgeScannedItem(){
    this.scannedItem = "";
    console.log(this.scannedItem);
  }
}

export type AppStateType = AppState;
export type CartStoreType = CartStore<CartItem>;
