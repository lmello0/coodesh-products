import { IProduct } from '../interfaces/IProduct';

export interface RedisRepositoryProtocol {
  get(key: string): Promise<void | IProduct | IProduct[]>;

  store(key: string, data: object): void;

  updateCache(code: string, data?: IProduct): void;

  delete(code: string): void;
}
