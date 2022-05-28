import { CategoriesStoreType } from "../data/store.actions";
import { BaseApiType } from "../api/storeApi";
import { ICode, ObjectType } from "../api/types";
import { isIResponseError } from "../api/types";

/**
 * Base class for controllers.
 * Used for call services (like api), update stores.
 */
export default class BaseController {
  constructor(
    private readonly _listStore: CategoriesStoreType,
    private readonly _api: BaseApiType
  ) {}

  get listStore(): CategoriesStoreType {
    return this._listStore;
  }

  get api(): BaseApiType {
    return this._api;
  }

  async create(modelData: ObjectType) {
    const response = await this.api.create(modelData);
    if (isIResponseError(response)) {
      //toast.error(response.message);
    } else {
      // await this.getList(); // variant for applying filters
      this.listStore.addCategory(response.model);
    }
  }

  async update(model: ICode) {
    const response = await this.api.update(model);
    if (isIResponseError(response)) {
      //toast.error(response.message);
    } else {
      // await this.getList(); // variant for applying filters
      this.listStore.updateCategory(response.model);
    }
  }
}
