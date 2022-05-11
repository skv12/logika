import { persist } from "mobx-persist";
import { observable, computed, action, makeObservable } from "mobx";
import { ErrorType, ICode } from "../api/types";

export interface Stock {
  name: string;
  priceType: string;
}
export interface Category extends ICode {
  name: string;
  parent: string;
  //items: Item[];
}
export interface Item extends ICode {
  name: string;
  category: string;
  currency: string;
  price: number;
  priceType: string;
  quantity: number;
  stockQuantity: Stock[];
}

export interface CListState<CategoriesList extends Category> {
  results: CategoriesList[];
  count?: number;
  isLoading?: boolean;
  error?: ErrorType;
}
export interface SListState<StockList extends Stock> {
  results: StockList[];
  count?: number;
  isLoading?: boolean;
  error?: ErrorType;
}
export interface IListState<ItemList extends Item> {
  results: ItemList[];
  count?: number;
  isLoading?: boolean;
  error?: ErrorType;
}

export class CategoriesStore<CategoriesList extends Category> {
  @observable
  protected categories: CListState<CategoriesList> = {
    results: [],
  };
  constructor() {
    makeObservable<CategoriesStore<CategoriesList>>(this);
  }
  get list(): Category[] {
    return Array.isArray(this.categories.results)
      ? this.categories.results
      : [];
  }
  @action
  addCategory(item: Category) {
    this.list.push(item);
  }
  @action
  getCategory(code: string){
      var item = this.list.find((element) =>{
          return element.code === code;
      });
      return item;
  }
  @action
  updateCategory(item: Category) {
    const foundTodo = this.list.find((element) => item && element.code === item.code);
    if (foundTodo && item) {
      Object.assign(foundTodo, item);
    }
  }
}
export class StocksStore<StockList extends Stock> {
    @observable
    protected stocks: SListState<StockList> = {
      results: [],
    };
    constructor() {
      makeObservable<StocksStore<StockList>>(this);
    }
    get list(): Stock[] {
      return Array.isArray(this.stocks.results)
        ? this.stocks.results
        : [];
    }
    @action
    addStock(item: Stock) {
      this.list.push(item);
    }
    @action
    getStock(name: string){
        return this.list.find((element) =>{
            return element.name === name;
        });
    }
    @action
    updateStock(item: Stock) {
      const foundTodo = this.list.find((element) => {return element.name === item.name});
      if (foundTodo) {
        Object.assign(foundTodo, item);
      }
    }
  }

export class ItemsStore<ItemList extends Item> {
    @observable
    protected items: IListState<ItemList> = {
      results: [],
    };
    constructor() {
      makeObservable<ItemsStore<ItemList>>(this);
    }
    get list(): Item[] {
      return Array.isArray(this.items.results)
        ? this.items.results
        : [];
    }
    @action
    addItem(item: Item) {
      this.list.push(item);
    }
    @action
    getItem(code: string){
        return this.list.find((element) =>{
            return element.code === code;
        });
    }
    @action
    updateItem(item: Item) {
      const foundTodo = this.list.find((element) => {return element.code === item.code});
      if (foundTodo) {
        Object.assign(foundTodo, item);
      }
    }
  }

export type CategoriesStoreType = CategoriesStore<Category>;
export type ItemsStoreType = ItemsStore<Item>;
export type StocksStoreType = StocksStore<Stock>;
