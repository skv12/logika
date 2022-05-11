import { Category } from '../data/store.state';
import apiService from './apiUri';
import {
  IResponseList,
  IResponseModel,
  IDeleteResponse,
  IResponseError,
  ICode,
} from './types';
import { ObjectType } from './types';

export default class BaseApi<T extends ICode> {
  constructor(private readonly _apiUrl: string) {}

  get apiUrl(): string {
    return this._apiUrl;
  }

  async getOne(
    id: number,
    params?: ObjectType,
  ): Promise<IResponseModel<T> | IResponseError> {
    try {
      const ret = await apiService.get(`${this._apiUrl}/${id}`, { params });
      return { model: ret.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getList(
    params?: ObjectType,
  ): Promise<IResponseList<T> | IResponseError> {
    try {
      const ret = await apiService.get(this._apiUrl, { params });
      return { results: ret.data || [] };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async create(
    modelData: ObjectType,
    params?: ObjectType,
  ): Promise<IResponseModel<T> | IResponseError> {
    try {
      const ret = await apiService.post(this._apiUrl, modelData, { params });
      return { model: ret.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async update(
    modelData: { code: string },
    params?: ObjectType,
  ): Promise<IResponseModel<T> | IResponseError> {
    try {
      const ret = await apiService.patch(
        `${this._apiUrl}/${modelData.code}`,
        modelData,
        { params },
      );
      return { model: ret.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete(
    id: number,
    params?: ObjectType,
  ): Promise<IDeleteResponse | IResponseError> {
    try {
      const ret = await apiService.delete(`${this._apiUrl}/${id}`, { params });
      return { id: ret.data };
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected handleError(e: any): IResponseError {
    let message = '';
    if (e.response) {
      message = e.message;
    }

    return { isError: true, message };
  }
}

export type BaseApiType = BaseApi<Category>;