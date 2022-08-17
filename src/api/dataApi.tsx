import { Preferences } from "@capacitor/preferences";
import axios from "axios";
import { Buffer } from "buffer";
import * as Constant from "../data/constants";
import {
  AppState,
  AppStateType,
  CartStore,
  CartStoreType,
} from "../data/data.state";
import {
  CategoriesStore,
  CategoriesStoreType,
  ItemsStore,
  ItemsStoreType,
  OrdersStore,
  OrdersStoreType,
  StocksStore,
  StocksStoreType,
} from "../data/store.actions";
import { Category, Item, Order, Stock } from "../data/store.state";

//export const categoriesStore = new CategoriesStore();
export interface IStoresContextValue {
  categoriesStore: CategoriesStoreType;
  stocksStore: StocksStoreType;
  itemsStore: ItemsStoreType;
  ordersStore: OrdersStoreType;
}
export interface IDataContextValue {
  appState: AppStateType;
  cartStore: CartStoreType;
}
export function initContextsValues() {
  const stores: IStoresContextValue = {
    categoriesStore: new CategoriesStore(),
    stocksStore: new StocksStore(),
    itemsStore: new ItemsStore(),
    ordersStore: new OrdersStore(),
  };
  const data: IDataContextValue = {
    appState: new AppState(),
    cartStore: new CartStore(),
  };

  return {
    stores,
    data,
  };
}
export const contexts = initContextsValues();
export const getUserData = async () => {
  const response = await Promise.all([
    Preferences.get({ key: Constant.HAS_LOGGED_IN }),
    Preferences.get({ key: Constant.LOGIN_TOKEN }),
    Preferences.get({ key: Constant.STARTUP_FLAG }),
    Preferences.get({ key: Constant.CURRENT_CATEGORY }),
    Preferences.get({ key: Constant.USER }),
  ]);
  const isLoggedin = (await response[0].value) === "true";
  const loginToken = (await response[1].value) || undefined;
  const startupFlag = (await response[2].value) === "true";
  const currentCategory = (await response[3].value) || undefined;
  const user = (await response[4].value) || undefined;
  const data = {
    isLoggedin,
    loginToken,
    startupFlag,
    currentCategory,
    user,
  };
  return data;
};
export const loginData = async (
  method: string,
  login?: string,
  password?: string,
  loginToken?: string
) => {
  var tempToken: string;
  if (loginToken) {
    tempToken = loginToken;
  } else {
    tempToken = Buffer.from(login + ":" + password).toString("base64");
  }
  var res = await axios
    .post(
      Constant.URL + method,
      {},
      {
        headers: {
          Authorization: "Basic " + tempToken,
        },
      }
    )
    .then(async (response) => {
      try {
        JSON.parse(JSON.stringify(response.data), (key, value) => {
          if (key === "accessToken")
            sessionStorage.setItem(Constant.SESSION_TOKEN, value);
          return true;
        });
        setIsLoggedInData(true);
        setLoginTokenData(tempToken);
        setLoginData(login);
        return true;
      } catch (e) {
        return false;
      }
    })
    .catch((error) => {
      return error;
    });

  return res;
};

export const getCategories = async (category?: string) => {
  var res = await axios
    .post(
      Constant.URL + Constant.GET_CATEGORIES,
      category! ? { name: category } : {},
      {
        headers: {
          Authorization: "Basic " + (await getUserData()).loginToken,
        },
      }
    )
    .then((response) => {
      var result = null;
      try {
        result = response.data;
        result.categories.map((item: Category) => {
          if (contexts.stores.categoriesStore.getCategory(item.code)) {
            return contexts.stores.categoriesStore.updateCategory(item);
          } else {
            return contexts.stores.categoriesStore.addCategory(item);
          }
        });
      } catch (e) {
        result = response.data;
      }
      return result;
    })
    .catch((error) => {
      return error;
    });
  return res;
};

export const getItems = async (category?: string, priceType?: string) => {
  var res = await axios
    .post(
      Constant.URL + Constant.GET_ITEMS,
      { getCat: category, getPrice: priceType },
      {
        headers: {
          Authorization: "Basic " + (await getUserData()).loginToken,
        },
      }
    )
    .then((response) => {
      var result = null;
      try {
        result = response.data;
        result.map((item: Item) => {
          if (contexts.data.appState.firstItemInit)
            return contexts.stores.itemsStore.addItem(item);
          else return contexts.stores.itemsStore.updateItem(item);
        });
        contexts.data.appState.setFirstItemInit();
        contexts.data.appState.setIsLoading(false);
        console.log(contexts.data.appState.isLoading);
      } catch (e) {
        result = response.data;
      }
      return result;
    })
    .catch((error) => {
      return error;
    });

  return res;
};

export const getStores = async () => {
  var res = await axios
    .post(
      Constant.URL + Constant.GET_STORES,
      {},
      {
        headers: {
          Authorization: "Basic " + (await getUserData()).loginToken,
        },
      }
    )
    .then((response) => {
      var result = null;
      try {
        result = response.data;
        result.map((item: Stock) => {
          if (contexts.stores.stocksStore.getStock(item.stores)) {
            return contexts.stores.stocksStore.updateStock(item);
          } else {
            return contexts.stores.stocksStore.addStock(item);
          }
        });
      } catch (e) {
        result = response.data;
      }

      return result;
    })
    .catch((error) => {
      return error;
    });
  return res;
};

export const getOrders = async (category?: string) => {
  var res = await axios
    .post(
      Constant.URL + Constant.GET_ORDERS,
      category! ? { author: "Администратор" } : { author: "Администратор" },
      {
        headers: {
          Authorization: "Basic " + (await getUserData()).loginToken,
        },
      }
    )
    .then((response) => {
      var result = null;
      try {
        result = response.data;
        result.map((order: Order) => {
          if (contexts.stores.ordersStore.getOrder(order.id)) {
            return contexts.stores.ordersStore.updateOrder(order);
          } else {
            return contexts.stores.ordersStore.addOrder(order);
          }
        });
      } catch (e) {
        result = response.data;
      }
      return response;
    })
    .catch((error) => {
      return error;
    });
  return res;
};

export const getServerIP = async () => {
  var res = await axios
    .post(
      Constant.URL + Constant.GET_SERVER_IP,
      {},
      {
        headers: {
          Authorization: "Basic " + (await getUserData()).loginToken,
        },
      }
    )
    .then((response) => {
      var result = null;
      try {
        result = JSON.parse(response.data);
      } catch (e) {
        result = response.data;
      }
      return result;
    })
    .catch((error) => {
      return error;
    });
  return res;
};

export const addOrder = async () => {
  var res = await axios
    .post(
      Constant.URL + Constant.ADD_ORDERS,
      { manager: "Администратор", items: contexts.data.cartStore.list },
      {
        headers: {
          Authorization: "Basic " + (await getUserData()).loginToken,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return res;
};
export const getItemCode = async (item: string) => {
  var res = await axios
    .post(
      Constant.URL + Constant.GET_ITEMCODE,
      {
        scannedBarcode: item,
      },
      {
        headers: {
          Authorization: "Basic " + (await getUserData()).loginToken,
        },
      }
    )
    .then((response) => {
      var result = null;
      try {
        result = JSON.parse(response.data);
      } catch (e) {
        result = response.data;
      }
      contexts.data.appState.setScannedItem(result[0].item);
      //console.log(result[0].item);
      return result;
    })
    .catch((error) => {
      return error;
    });

  return res;
};
export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Preferences.set({
    key: Constant.HAS_LOGGED_IN,
    value: JSON.stringify(isLoggedIn),
  });
};

export const setLoginTokenData = async (loginToken?: string) => {
  if (!loginToken) {
    await Preferences.remove({ key: Constant.LOGIN_TOKEN });
  } else {
    await Preferences.set({ key: Constant.LOGIN_TOKEN, value: loginToken });
  }
};

export const setLoginData = async (user?: string) => {
  if (!user) {
    await Preferences.remove({ key: Constant.USER });
  } else {
    await Preferences.set({ key: Constant.USER, value: user });
  }
};
export const setStartupFlag = async (startupFlag: boolean) => {
  await Preferences.set({
    key: Constant.STARTUP_FLAG,
    value: JSON.stringify(startupFlag),
  });
};
export const setCurrentCategory = async (currentCategory: string) => {
  await Preferences.set({
    key: Constant.CURRENT_CATEGORY,
    value: currentCategory,
  });
};
export let getCurrentCategory = async () => {
  let curCat = (await getUserData()).currentCategory;
  return curCat;
};
