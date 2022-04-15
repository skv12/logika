import { Storage } from "@capacitor/storage";
import axios from "axios";
import { Buffer } from "buffer";

const HAS_LOGGED_IN = "hasLoggedIn";
const LOGIN_TOKEN = "loginToken";
const LOGIN = "login";
const URL = "http://127.0.0.1/stockholm/hs/api/";
export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: LOGIN_TOKEN }),
    Storage.get({ key: LOGIN }),
  ]);
  const isLoggedin = (await response[0].value) === "true";
  const loginToken = (await response[1].value) || undefined;
  const login = (await response[2].value) || undefined;
  const data = {
    isLoggedin,
    loginToken,
    login,
  };
  // console.log(isLoggedin);
  // console.log(loginToken);
  // console.log(login);
  return data;
};
export const loginData = async (
  method: string,
  login: string,
  password: string
) => {
  if (password)
    setLoginTokenData(Buffer.from(login + ":" + password).toString("base64"));
  var res = await axios
    .post(
      URL + method,
      {},
      {
        headers: {
          Authorization: "Basic " + (await getUserData()).loginToken,
        },
      }
    )
    .then(() => {
      setIsLoggedInData(true);
      return true;
    })
    .catch(() => {
      return false;
    });
  return res;
};
export const getCategories = async (method: string, category?: string) => {
  console.log(category);
  var res = await axios
    .post(URL + method, category! ? {name: category,} : {}, {
      headers: {
        Authorization: "Basic " + (await getUserData()).loginToken,
      },
    })
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
      console.log(error);
      return error;
    });
  console.log(res);
  return res;
};
export const logoutData = async () => {
  setIsLoggedInData(false);
  await Storage.remove({ key: LOGIN_TOKEN });
};
export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
};

export const setLoginTokenData = async (loginToken: string) => {
  await Storage.set({ key: LOGIN_TOKEN, value: loginToken });
};

export const setLoginData = async (login?: string) => {
  if (!login) {
    await Storage.remove({ key: LOGIN });
  } else {
    await Storage.set({ key: LOGIN, value: login });
  }
};
