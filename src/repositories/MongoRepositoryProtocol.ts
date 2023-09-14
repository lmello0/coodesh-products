import { GetProductDTO } from '../dtos/GetProductDTO';
import { IProduct } from '../interfaces/IProduct';

export interface MongoRepositoryProtocol {
  findAll(): Promise<IProduct[]>;

  findOne(data: GetProductDTO): Promise<IProduct>;
}
