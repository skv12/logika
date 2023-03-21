import axios from "axios";
import React from "react";
import { Store } from "./pages/Store";
import { Buffer } from "buffer";
import { SERV } from "./data/DataApi";
interface ContainerProps {
  children: any;
}

export const Context = React.createContext<any>(undefined);

export const AuthProvider: React.FC<ContainerProps> = ({ children }) => {
  const [authValues, setAuthValues] = React.useState<any>({
    loggedIn: false,
    token: null,
  });

  const Auth = async (
    autologin: boolean,
    remember?: boolean,
    login?: string,
    password?: string
  ) => {
    let authcode: any;
    if (autologin) {
      authcode = localStorage.getItem("app_data_token");
      var k = Buffer.from(authcode, "base64").toString("utf8");
      var t = k.split(":");
      login = t[0];
      password = t[1];
    } else authcode = Buffer.from(login + ":" + password).toString("base64");
    var res = await axios
      .post(SERV() + "login", {
        headers: {
          Authorization: "Basic " + authcode,
        },
      })
      .then((response) => {
        console.log(response);
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
        setAuthValues({
          loggedIn: true,
          token: authcode,
        });
        return true;
      })
      .catch((error) => {
        return false;
      });
    return res;
  };

  const logout = () => {
    setAuthValues({
      loggedIn: false,
      token: null,
    });
  };

  let state = {
    authValues,
    Auth,
    logout,
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};
export default Context;
