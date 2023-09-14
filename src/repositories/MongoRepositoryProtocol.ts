import { IProduct } from '../interfaces/IProduct';

export interface MongoRepositoryProtocol {
  findAll(): Promise<IProduct[]>;
}
