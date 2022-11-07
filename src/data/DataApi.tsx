import axios from "axios";
import { SERV, Store } from "../pages/Store";
import { Buffer } from "buffer";
export const Auth = async (
  login: string,
  password: string,
  remember: boolean
) => {
  let authcode: string;
  authcode = Buffer.from(login + ":" + password).toString("base64");
  var res = await axios
    .get(SERV() + "Логин", {
      headers: {
        Authorization: "Basic " + authcode,
      },
    })
    .then((response) => response.data)
    .then((getData) => {
      Store.dispatch({
        type: "us",
        auth: true,
        user: login,
        password: password,
        role: getData.Тип,
      });
      localStorage.setItem("app_data_login", login);
      localStorage.setItem(
        "app_data_token",
        Buffer.from(login + ":" + password).toString("base64")
      );
      localStorage.setItem("app_remember", remember.toString());
      return true;
    })
    .catch((error) => {
      return false;
    });
  return res;
};
