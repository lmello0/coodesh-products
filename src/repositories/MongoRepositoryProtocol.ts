import { DeleteProductDTO } from '../dtos/DeleteProductDTO';
import { GetProductDTO } from '../dtos/GetProductDTO';
import { UpdateProductDTO } from '../dtos/UpdateProductDTO';
import { IProduct } from '../interfaces/IProduct';

export interface MongoRepositoryProtocol {
  findAll(page: number, limit: number): Promise<IProduct[]>;

  findOne(data: GetProductDTO): Promise<IProduct>;

  updateOne(data: UpdateProductDTO): Promise<IProduct>;

  delete(data: DeleteProductDTO): Promise<string>;
}
