import axios from "axios";
import { Store, t_type } from "../pages/Store";

export const getCategory = async () => {
  let res = false;
  res = await axios
    .get(SERV() + "categories", {
      headers: {
        Authorization: "Basic " + localStorage.getItem("app_data_token"),
      },
    })
    .then((response) => {
      Store.dispatch({ type: "cate", data: response.data });
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return res;
};

export async function getGoods(data) {
  const res = await axios
    .get(SERV() + "products", {
      headers: {
        Authorization: "Basic " + localStorage.getItem("app_data_token"),
      },
      params: {
        params: JSON.stringify(data),
      },
    })
    .then((response) => {
      Store.dispatch({ type: "gd", data: response.data });
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  return res;
}

export const getElement = async (id: string, stock: string) => {
  const res = await axios
    .get(SERV() + "products/" + id, {
      params: {
        Склад: stock,
      },
      headers: {
        Authorization: "Basic " + localStorage.getItem("app_data_token"),
      },
    })
    .then((response) => {
      Store.dispatch({ type: "add_element", data: response.data });
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
  return res;
};

export async function getData(url, params) {
  let res = await axios
    .post(SERV() + url, params, {
      headers: {
        Authorization: "Basic " + localStorage.getItem("app_data_token"),
      },
    })
    .then((response) => response.data)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return { Код: 200, Описание: error };
    });

  return res;
}

export async function getDocs(param) {
  let res = await axios
    .get(SERV() + "История", {
      headers: {
        Authorization: "Basic " + localStorage.getItem("app_data_token"),
      },
      params: {
        Дата: param.Дата,
        Номенклатура: param.Номенклатура,
        Пользователь: param.Пользователь,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      Store.dispatch({ type: "docs", data: data });
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return res;
}

export async function getDist(params) {
  let res = await axios
    .get(SERV() + "Доставки", {
      headers: {
        Authorization: "Basic " + localStorage.getItem("app_data_token"),
      },
      params,
    })
    .then((response) => response.data)
    .then((data) => {
      Store.dispatch({ type: "dist", data: data });
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return res;
}

export async function getStores() {
  let res = false;
  res = await axios
    .get(SERV() + "stores", {
      headers: {
        Authorization: "Basic " + localStorage.getItem("app_data_token"),
      },
    })
    .then((response) => response.data)
    .then((data) => {
      Store.dispatch({ type: "stock", data: data });
      Store.dispatch({ type: "p1", Склады: StoreToString() });
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return res;
}

export function StoreToString(): Array<string> {
  let store = Store.getState().stores;
  return store.map((e: t_type) => {
    if (e.checked) return e.value;
    return "";
  });
}

export async function get_Store() {
  if (await getStores()) {
    Store.dispatch({ type: "list_stock" });
    getGoods(Store.getState().param1);
    getDocs({ params: {} });
    getDist({ params: {} });
  }
}

export function SERV() {
  let ip = localStorage.getItem("serv");
  let port = localStorage.getItem("port");
  let base = localStorage.getItem("base");

  if (ip === null || ip === undefined) ip = "";
  if (port === null || port === undefined) port = "";
  if (base === null || base === undefined) base = "";

  // if ((ip as string).length < 13) ip = "91.185.236.216";
  // if ((port as string).length < 5) port = "29080";
  // if ((base as string).length < 5) base = "trade_test";


  let url = " http://" + ip + ":" + port + "/" + base +"/hs/api/v1/";

  return url;
}