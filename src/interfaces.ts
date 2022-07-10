export interface IResponse<T> {
  items: Array<T>;
  limit: number;
  offset: number;
  total: number;
}
