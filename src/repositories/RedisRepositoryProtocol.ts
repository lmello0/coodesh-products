import { IProduct } from '../interfaces/IProduct';

export interface RedisRepositoryProtocol {
  get(key: string): Promise<void | IProduct | IProduct[]>;

  store(key: string, data: object): void;

  updateCache(): void;
}
