import { persist } from "mobx-persist";
import { observable, computed, action, makeObservable, autorun } from "mobx";
import { ErrorType, ICode } from "../api/types";
import React, { Component } from "react";

export class AppState {
  @observable
  currentCategory = "";

  @observable
  previousCategories: string[] = [];

  @observable
  currentItem = "";

  constructor() {
    makeObservable<AppState>(this);
  }

  @action
  setCategory(category: string) {
    this.previousCategories.push(this.currentCategory);
    this.currentCategory = category;
  }

  @action
  setItem(item: string) {
    this.currentItem = item;
  }
//   @action
//   getCategory() {
//     return this.currentCategory;
//   }
//   @action
//   getItem() {
//     return this.currentItem;
//   }
  @action
  purgeCategory() {
    let popped = this.previousCategories.pop();
    if (popped === undefined) this.currentCategory = "main";
    else this.currentCategory = popped;
  }
  @action
  purgeItem() {
    this.currentItem = "";
  }
}

export type AppStateType = AppState;
