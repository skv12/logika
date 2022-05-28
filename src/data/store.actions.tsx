import { observable, action, makeObservable } from "mobx";
import {
  Category,
  CListState,
  IListState,
  Item,
  OListState,
  Order,
  SListState,
  Stock,
} from "./store.state";

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
  getCategory(code: string) {
    var item = this.list.find((element) => {
      return element.code === code;
    });
    return item;
  }
  @action
  updateCategory(item: Category) {
    const foundTodo = this.list.find(
      (element) => item && element.code === item.parent
    );
    if (foundTodo && item) {
      Object.assign(foundTodo.childrens, item);
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
    return Array.isArray(this.stocks.results) ? this.stocks.results : [];
  }
  @action
  addStock(item: Stock) {
    this.list.push(item);
  }
  @action
  getStock(name: string) {
    return this.list.find((element) => {
      return element.stores === name;
    });
  }
  @action
  updateStock(item: Stock) {
    const foundTodo = this.list.find((element) => {
      return element.stores === item.stores;
    });
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
    return Array.isArray(this.items.results) ? this.items.results : [];
  }
  @action
  addItem(item: Item) {
    this.list.push(item);
  }
  @action
  getItem(code: string) {
    return this.list.find((element) => {
      return element.code === code;
    });
  }
  @action
  updateItem(item: Item) {
    const foundTodo = this.list.find((element) => {
      return element.code === item.code;
    });
    if (foundTodo) {
      Object.assign(foundTodo, item);
    }
  }
}

export class OrdersStore<OrderList extends Order> {
  @observable
  protected orders: OListState<OrderList> = {
    results: [],
  };
  constructor() {
    makeObservable<OrdersStore<OrderList>>(this);
  }
  get list(): Order[] {
    return Array.isArray(this.orders.results) ? this.orders.results : [];
  }
  @action
  addOrder(order: Order) {
    this.list.push(order);
  }
  @action
  getOrder(id: string) {
    return this.list.find((element) => {
      return element.id === id;
    });
  }
  @action
  updateOrder(order: Order) {
    const foundTodo = this.list.find((element) => {
      return element.id === order.id;
    });
    if (foundTodo) {
      Object.assign(foundTodo, order);
    }
  }
}

export type CategoriesStoreType = CategoriesStore<Category>;
export type ItemsStoreType = ItemsStore<Item>;
export type StocksStoreType = StocksStore<Stock>;
export type OrdersStoreType = OrdersStore<Order>;
