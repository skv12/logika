import { Storage } from "@capacitor/storage";
import axios from "axios";
import { Buffer } from "buffer";
import * as Constant from "../data/constants";
import {
  CategoriesStore,
  CategoriesStoreType,
  Category,
  ItemsStore,
  ItemsStoreType,
  Stock,
  StocksStore,
  StocksStoreType,
} from "../data/store.state";

//export const categoriesStore = new CategoriesStore();
export interface IStoresContextValue {
  categoriesStore: CategoriesStoreType;
  stocksStore: StocksStoreType;
  itemsStore: ItemsStoreType;
}

export function initContextsValues() {
  const stores: IStoresContextValue = {
    categoriesStore: new CategoriesStore(),
    stocksStore: new StocksStore(),
    itemsStore: new ItemsStore(),
  };

  return {
    stores,
  };
}
export const contexts = initContextsValues();

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: Constant.HAS_LOGGED_IN }),
    Storage.get({ key: Constant.LOGIN_TOKEN }),
    Storage.get({ key: Constant.STARTUP_FLAG }),
    Storage.get({ key: Constant.CURRENT_CATEGORY})
  ]);
  const isLoggedin = (await response[0].value) === "true";
  const loginToken = (await response[1].value) || undefined;
  const startupFlag = (await response[2].value) === "true";
  const currentCategory = (await response[3].value) || undefined;
  const data = {
    isLoggedin,
    loginToken,
    startupFlag,
    currentCategory
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
    .then((response) => {
      var result = null;
      try {
        result = JSON.stringify(
          JSON.parse(JSON.stringify(response.data), (key, value) => {
            if (key === "accessToken")
              sessionStorage.setItem(Constant.SESSION_TOKEN, value);
            return true;
          })
        );
        setIsLoggedInData(true);
        setLoginTokenData(tempToken);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    })
    .catch((response) => {
      return false;
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
        console.log(result);
        result.categories.map((item: Category) => {
          if (contexts.stores.categoriesStore.getCategory(item.code)) {
            return contexts.stores.categoriesStore.updateCategory(item);
          } 
          else {
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
        // result = response.data;
        // result.map ((item: Category) => {
        //   store.addCategory(item);
        // });
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
          contexts.stores.stocksStore.addStock(item);
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

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({
    key: Constant.HAS_LOGGED_IN,
    value: JSON.stringify(isLoggedIn),
  });
};

export const setLoginTokenData = async (loginToken?: string) => {
  if (!loginToken) {
    await Storage.remove({ key: Constant.LOGIN_TOKEN });
  } else {
    await Storage.set({ key: Constant.LOGIN_TOKEN, value: loginToken });
  }
};

export const setLoginData = async (login?: string) => {
  if (!login) {
    await Storage.remove({ key: Constant.LOGIN });
  } else {
    await Storage.set({ key: Constant.LOGIN, value: login });
  }
};
export const setStartupFlag = async (startupFlag: boolean) => {
  await Storage.set({
    key: Constant.STARTUP_FLAG,
    value: JSON.stringify(startupFlag),
  });
};
export const setCurrentCategory = async (currentCategory: string) =>{
  await Storage.set({
    key: Constant.CURRENT_CATEGORY,
    value: currentCategory,
  });
}
export let getCurrentCategory = async () =>{
  let curCat = (await getUserData()).currentCategory;
  return curCat;
}
