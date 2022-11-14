import axios from "axios";
import { getStores, SERV, Store } from "../pages/Store";
import { Buffer } from "buffer";
export const Auth = async (
  autologin: boolean,
  remember?: boolean,
  login?: string,
  password?: string
) => {
  let authcode: any;
  if (autologin) authcode = localStorage.getItem("app_data_token");
  else authcode = Buffer.from(login + ":" + password).toString("base64");
  var res = await axios
    .get(SERV() + "Логин", {
      headers: {
        Authorization: "Basic " + authcode,
      },
    })
    .then((response) => {
      Store.dispatch({
        type: "us",
        auth: true,
        user: login,
        password: password,
        role: response.data.Тип,
      });
      if (login) localStorage.setItem("app_data_login", login);
      if (login)
        localStorage.setItem(
          "app_data_token",
          Buffer.from(login + ":" + password).toString("base64")
        );
      if (remember !== undefined)
        localStorage.setItem("app_remember", remember.toString());

      return true;
    })
    .catch((error) => {
      return false;
    });
  return res;
};
