import { IProduct } from '../interfaces/IProduct';

export interface GetProductsDTO {
  hasNext: boolean;
  products: IProduct[];
}
