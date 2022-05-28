export interface DispatchObject {
  [key: string]: any;
  type: string;
}

type PromiseResolveValue<T> = T extends Promise<infer R> ? R : T;
type EffectType<T extends (...args: any) => any> = ReturnType<ReturnType<T>>;
type EffectReturnValue<T extends (...args: any) => any> = PromiseResolveValue<EffectType<T>>;
export type ActionType<T extends (...args: any) => any> = ReturnType<T> extends DispatchObject ? ReturnType<T> : EffectReturnValue<T>;
export type ObjectType = Record<string, unknown> | null | undefined;
export type ErrorType = string | ObjectType;
//export interface IIdentifiable { id: number; }
export interface ICode { code: string; }
export interface IResponseModel<T extends ICode> {
  model: T;
}

export interface IResponseList<T extends ICode> {
  results: T[];
  count?: number;
}

export interface IDeleteResponse {
  id?: number;
}

export interface IResponseError {
  isError: boolean;
  message: string;
  error?: ObjectType;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIResponseError(object: any): object is IResponseError {
  return 'isError' in object;
}
