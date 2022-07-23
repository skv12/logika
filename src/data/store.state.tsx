import { ErrorType, ICode } from "../api/types";

export interface Stock {
  stores: string;
  priceType: string;
}
export interface Childrens {
  categories?: Category[];
  items?: Item[];
}
export interface StockQuantity {
  stock: Stock;
  quantity: number;
}
export interface OrderItems {
  name: string;
  quantity: number;
}
export interface Order {
  id: string;
  name: string;
  date: Date;
  number: string;
  completed: boolean;
  confirm: boolean;
  sumOrder: number;
  customer: string;
  seller: string;
  stock: Stock;
  manager: string;
  cashier: string;
  bankAccount: string;
  purposer: string;
  deliveryMethod: string;
  deliveryComment: string;
  orderItems: OrderItems[];
}

export interface Category extends ICode {
  name: string;
  parent: string;
  childrens?: Childrens[];
}
export interface Item extends ICode {
  name: string;
  category: string;
  currency: string;
  price: number;
  priceType: string;
  quantity: number;
  barcode: number;
  stockQuantity: StockQuantity[];
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

export interface OListState<OrderList extends Order> {
  results: OrderList[];
  count?: number;
  isLoading?: boolean;
  error?: ErrorType;
}
