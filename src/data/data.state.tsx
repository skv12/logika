
import { observable, action, makeObservable } from "mobx";

export class AppState {
  @observable
  currentCategory = "0";

  @observable
  previousCategories: string[] = [];

  @observable
  currentItem = "";

  @observable
  currentOrder = "";
  
  @observable
  firstInit = false;

  @observable
  url = "";
  constructor() {
    makeObservable<AppState>(this);
  }
  @action
  setFirstInit(){
    this.firstInit = true;
  }
  @action
  setCategory(category: string) {
    this.previousCategories.push(this.currentCategory);
    this.currentCategory = category;
  }

  @action
  setItem(item: string) {
    this.currentItem = item;
  }

  @action
  setOrder(order: string) {
    this.currentOrder = order;
  }
  @action
  purgeCategory() {
    const popped = this.previousCategories[this.previousCategories.length-1];
    this.previousCategories.splice(-1);
    if (popped === undefined) this.currentCategory = "0";
    else this.currentCategory = popped;
  }
  @action
  purgeItem() {
    this.currentItem = "";
  }
  @action
  purgeOrder() {
    this.currentOrder = "";
  }
}

export type AppStateType = AppState;
