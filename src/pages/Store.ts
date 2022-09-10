import { combineReducers } from "redux";
import axios from "axios";

function i_data() {
  var date = new Date();
  let str = date.toISOString().substr(0, 10);
  return str.substr(0, 4) + "-" + str.substr(5, 2) + "-" + str.substr(8, 2);
}

export async function getData(url, params) {
  let user = Store.getState().user;
  console.log(user);
  let res = await axios
    .post(SERV() + url, params, {
      auth: {
        username: unescape(encodeURIComponent(user.user)),
        password: unescape(encodeURIComponent(user.password)),
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

export async function getImg(params) {
  let user = Store.getState().user;
  console.log(params);
  let res = await axios
    .post(SERV() + "МП_Фото", {ГУИД : params}, {
      auth: {
        username: unescape(encodeURIComponent(user.user)),
        password: unescape(encodeURIComponent(user.password)),
      },
    })
    .then((response) => response.data)
    .then((data) => {
      Store.dispatch({ type: "img", data: data });
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
    
  return res;
}


export async function getGoods(params) {
  let user = Store.getState().user;
  console.log(user);

  let res = await axios
    .post(SERV() + "Остатки", params, {
      auth: {
        username: unescape(encodeURIComponent(user.user)),
        password: unescape(encodeURIComponent(user.password)),
      },
    })
    .then((response) => response.data)
    .then((data) => {
      Store.dispatch({ type: "gd", data: data });
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return res;
}

export async function getDocs(params) {
  let user = Store.getState().user;
  console.log(user);

  let res = await axios
    .get(SERV() + "История", {
      auth: {
        username: unescape(encodeURIComponent(user.user)),
        password: unescape(encodeURIComponent(user.password)),
      },
      params,
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
  let user = Store.getState().user;
  console.log(user);

  let res = await axios
    .get(SERV() + "Доставки", {
      auth: {
        username: unescape(encodeURIComponent(user.user)),
        password: unescape(encodeURIComponent(user.password)),
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
  let user = Store.getState().user;
  console.log(user);
  let res = false;
  res = await axios
    .get(SERV() + "Склады", {
      auth: {
        username: unescape(encodeURIComponent(user.user)),
        password: unescape(encodeURIComponent(user.password)),
      },
    })
    .then((response) => response.data)
    .then((data) => {
      Store.dispatch({ type: "sto", data: data });
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
  let stor = Store.getState().stores;
  return stor.map(function (st) {
    if (st.checked) return st.value;
    return "";
  });
}

export interface o_type {
  ГУИД: string;
  Склад: string;
  Группа: string;
  Код: string;
  Номенклатура: string;
  Артикул: string;
  Цена: number;
  Остаток: number;
  ЭтоГруппа: boolean;
  Вес: number;
  Объем: number;
  Производитель: string;
  ИмпортерКонтрагент: string;
  ДопРеквизиты: Array<dr_type>;
  
}

export interface h_type {
  Дата: Date;
  Номер: string;
  Документ: string;
  Наличные: number;
  Карта: number;
  Сертификат: number;
  Банк: number;
}

export interface g_type {
  Номенклатура: string;
  КОтгрузке: number;
}
export interface dr_type {

  Наименование: string;
  Значение: string;
}

export interface d_type {
  Номер: string;
  Дата: string;
  Зона: string;
  Адрес: string;
  Состояние: string;
  ВремяС: string;
  ВремяПо: string;
  Данные: Array<g_type>;
}

export interface t_type {
  name: string;
  type: string;
  label: string;
  value: string;
  checked: boolean;
}

export interface t_param1 {
  Номенклатура: string;
  Склады: Array<string>;
  Группа: Array<string>;
}

export interface t_image {
  ГУИД: string;
  Картинка: string;

}

export interface t_good {
  ГУИД: string;
  Артикул: string;
  Наименование: string;
  Количество: number;
  Цена: number;
  Сумма: number;
  Склад: string;
  Остаток: number;
  Группа: string;
  Вес: number;
  Объем: number;
  Производитель: string;
  ИмпортерКонтрагент: string;
  ДопРеквизиты: Array<dr_type>;
  
}

interface t_search {
  Дата: string;
  Номенклатура: string;
  Пользователь: boolean;
}

interface s_type {
  user: {
    auth: boolean;
    user: string;
    password: string;
    role: string;
  };

  goods: Array<o_type>;

  docs: Array<h_type>;

  dist: Array<d_type>;

  stores: Array<t_type>;

  param1: Array<t_param1>;

  basket: Array<t_good>;

  search: t_search;

  gimages: t_image;


}

const i_state: s_type | any = {
  user: {
    auth: true,
    user: "",
    password: "",
    role: "",
  },

  goods: [],

  docs: [],

  dist: [],

  stores: [],

  param1: {
    Номенклатура: "",
    Склады: [],
    Группа: [""],
  },

  basket: [],

  search: { Дата: i_data(), Номенклатура: "", Пользователь: false },

  gimages: {
    ГУИД: "",
    Картинка: "",
  }
};

function usReducer(state = i_state.user, action) {
  switch (action.type) {
    case "us": {
      return {
        auth: action.auth === undefined ? state.auth : action.auth,
        user: action.user === undefined ? state.user : action.user,
        password:
          action.password === undefined ? state.password : action.password,
        role: action.role === undefined ? state.role : action.role,
      };
    }
    default:
      return state;
  }

  console.log(state);
}

function gdReducer(state = i_state.goods, action) {
  switch (action.type) {
    case "gd": {
      return action.data;
    }
    case "del_goods":
      return [];
    default:
      return state;
  }
}

function imgReducer(state = i_state.gimages, action) {
  switch (action.type) {
    case "img": {
      return action.data;
    }
    case "del_img":
      return {};
    default:
      return state;
  }
}

function dcReducer(state = i_state.docs, action) {
  switch (action.type) {
    case "docs": {
      return action.data;
    }
    case "del_docs":
      return [];
    default:
      return state;
  }
}

function dsReducer(state = i_state.dist, action) {
  switch (action.type) {
    case "dist": {
      return action.data;
    }
    case "del_dist":
      return [];
    default:
      return state;
  }
}

function stReducer(state = i_state.stores, action) {
  switch (action.type) {
    case "sto": {
      return action.data;
    }
    case "set_sto": {
      return state.map(function (curr) {
        return {
          name: curr.name,
          type: curr.type,
          label: curr.label,
          value: curr.value,
          checked: action.data,
        };
      });
    }
    case "upd_sto": {
      return state.map(function (curr) {
        if (curr.value === action.value)
          return {
            name: curr.name,
            type: curr.type,
            label: curr.label,
            value: curr.value,
            checked: action.checked,
          };
        else
          return {
            name: curr.name,
            type: curr.type,
            label: curr.label,
            value: curr.value,
            checked: curr.checked,
          };
      });
    }
    case "del_sto":
      return [];
    default:
      return state;
  }
}

function p1Reducer(state = i_state.param1, action) {
  switch (action.type) {
    case "p1": {
      return {
        Номенклатура:
          action.Номенклатура === undefined
            ? state.Номенклатура
            : action.Номенклатура,
        Склады: action.Склады === undefined ? state.Склады : action.Склады,
        Группа: action.Группа === undefined ? state.Группа : action.Группа,
      };
    }

    case "gr_add": {
      return {
        Номенклатура: state.Номенклатура,
        Склады: state.Склады,
        Группа: [...state.Группа, action.Группа],
      };
    }
    case "gr_del": {
      let jarr = state.Группа;
      let count = state.Группа.length;
      if (count > 1) jarr.splice(count - 1, 1);
      return {
        Номенклатура: state.Номенклатура,
        Склады: state.Склады,
        Группа: jarr,
      };
    }
    default:
      return state;
  }
}

function bsReducer(state = i_state.basket, action) {
  switch (action.type) {
    case "add_basket":
      return [...state, action.basket];
    case "upd_basket":
      return state.map((todo) => {
        if (todo.Артикул === action.basket.Артикул) {
          return {
            ...todo,
            Количество: action.basket.Количество,
            Сумма: action.basket.Сумма,
          };
        }
        return todo;
      });
    case "basket":
      return action.basket;
    case "cl_basket":
      return [];
    default:
      return state;
  }
}

function srReducer(state = i_state.search, action) {
  switch (action.type) {
    case "search": {
      return {
        Дата: action.Дата === undefined ? state.Дата : action.Дата,
        Номенклатура:
          action.Номенклатура === undefined
            ? state.Номенклатура
            : action.Номенклатура,
        Пользователь:
          action.Пользователь === undefined
            ? state.Пользователь
            : action.Пользователь,
      };
    }

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user: usReducer,
  goods: gdReducer,
  gimages: imgReducer,
  docs: dcReducer,
  dist: dsReducer,
  stores: stReducer,
  param1: p1Reducer,
  basket: bsReducer,
  search: srReducer,
});

function create_Store(reducer, initialState) {
  var currentReducer = reducer;
  var currentState = initialState;
  var store_list = () => {};
  var auth_list = () => {};
  var l_basket = () => {};
  return {
    getState() {
      return currentState;
    },
    dispatch(action) {
      currentState = currentReducer(currentState, action);
      switch (action.type) {
        case "list_sto":
          store_list();
          break;
        case "us":
          {
            auth_list();
          }
          break;
      }
      if (action.type.indexOf("basket") > -1) l_basket();
      return action;
    },
    subscribe_store(newListener) {
      store_list = newListener;
    },
    subscribe_auth(newListener) {
      auth_list = newListener;
    },
    subscribe_basket(newListener) {
      l_basket = newListener;
    },
  };
}

export async function get_Store() {
  let res = await getStores();
  if (res) {
    Store.dispatch({ type: "list_sto" });
    getGoods(Store.getState().param1);
    getDocs({ params: {} });
    getDist({ params: {} });
  }
}

export function SERV() {
  let ip = localStorage.getItem("StokHolm_SERV");
  let port = localStorage.getItem("StokHolm_PORT");

  if (ip === null || ip === undefined) ip = "";
  if (port === null || port === undefined) port = "";

  if ((ip as string).length < 13) ip = "91.185.236.216";
  if ((port as string).length < 5) port = "29080";

  let url = " http://" + ip + ":" + port + "/trade_test/hs/API/V1/";

  return url;
}

export const Store = create_Store(rootReducer, i_state,);

export async function getDatas() {}

getDatas();
