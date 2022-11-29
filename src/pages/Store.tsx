import { combineReducers } from "redux";
import { endOfDay, format } from "date-fns";

export interface item_type {
  ГУИД: string;
  Номенклатура: string;
  Склад: string;
  Группа: string;
  Код: string;
  Артикул: string;
  Цена: number;
  Остаток: number;
}

export interface element_type {
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
  Картинка: string;
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
  Группа: string;
}

interface t_search {
  Дата: string;
  Номенклатура: string;
  Пользователь: boolean;
}

interface t_categories {
  Код: string;
  Наименование: string;
  Родитель: string;
}

interface s_type {
  user: {
    auth: boolean;
    user: string;
    password: string;
    role: string;
  };

  goods: Array<item_type>;

  docs: Array<h_type>;

  dist: Array<d_type>;

  stores: Array<t_type>;

  param1: Array<t_param1>;

  basket: Array<element_type>;

  search: t_search;

  element: element_type;

  categories: Array<t_categories>;
}

const i_state: s_type | any = {
  user: {
    auth:
      JSON.parse(localStorage.getItem("app_remember")!) === true ? true : false,
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
    Группа: "",
  },

  basket: [],

  search: {
    Дата: format(endOfDay(new Date()), "yyyy-MM-dd"),
    Номенклатура: "",
    Пользователь: false,
  },

  element: {
    ГУИД: "",
    Артикул: "",
    Наименование: "",
    Цена: 0,
    Количество: 0,
    Сумма: 0,
    Склад: "",
    Остаток: 0,
    Группа: "",
    Вес: 0,
    Объем: 0,
    Производитель: "",
    ИмпортерКонтрагент: "",
    ДопРеквизиты: [],
    Картинка: "",
  },

  categories: [],
};

function usReducer(state = i_state.user, action) {
  switch (action.type) {
    case "us": {
      console.log(action);
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

function elementReducer(state = i_state.element, action) {
  switch (action.type) {
    case "add_element": {
      return action.data;
    }
    case "del_element":
      return {
        ГУИД: "",
        Артикул: "",
        Наименование: "",
        Цена: 0,
        Количество: 0,
        Сумма: 0,
        Склад: "",
        Остаток: 0,
        Группа: "",
        Вес: 0,
        Объем: 0,
        Производитель: "",
        ИмпортерКонтрагент: "",
        ДопРеквизиты: [],
        Картинка: "",
      };
    default:
      return state;
  }
}

function cateReducer(state = i_state.categories, action) {
  switch (action.type) {
    case "cate": {
      return action.data;
    }
    case "del_cate":
      return [];
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
    case "stock": {
      return action.data;
    }
    case "set_stock": {
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
    case "upd_stock": {
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
    case "del_stock":
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
      return {
        Номенклатура: state.Номенклатура,
        Склады: state.Склады,
        Группа: state.Группа,
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
  element: elementReducer,
  docs: dcReducer,
  dist: dsReducer,
  stores: stReducer,
  param1: p1Reducer,
  basket: bsReducer,
  search: srReducer,
  categories: cateReducer,
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
        case "list_stock":
          store_list();
          break;
        case "us":
          auth_list();
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

export const Store = create_Store(rootReducer, i_state);
