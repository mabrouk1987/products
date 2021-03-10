export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR,
}
export interface AppDataState<T> {
  dataState?: DataStateEnum,
  data?: T,
  errorMessage?: string
}

export enum ProductActionsTypes {
  GET_ALL_PRODUCTS='[Poduct] Get All Products',
  GET_SELECTED_PRODUCTS='[Poduct] Get Selected Products',
  GET_AVAILABLE_PRODUCTS='[Poduct] Get Available Products',
  SEARCH_PRODUCTS='[Poduct] Search Products',
  NEW_PRODUCT='[Poduct] New Product',
  SELECT_PRODUCT='[Poduct] Select Product',
  EDIT_PRODUCT='[Poduct] Edit Product',
  DELETE_PRODUCT='[Poduct] Delete Product',
}

export interface ActionEvent {
  type: ProductActionsTypes,
  payload?: any,
}
