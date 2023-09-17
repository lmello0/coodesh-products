import { DeleteProductDTO } from '../dtos/DeleteProductDTO';
import { GetProductDTO } from '../dtos/GetProductDTO';
import { UpdateProductDTO } from '../dtos/UpdateProductDTO';
import { IHist } from '../interfaces/IHist';
import { IProduct } from '../interfaces/IProduct';
import { IUser } from '../interfaces/IUser';

export interface MongoRepositoryProtocol {
  findAll(page: number, limit: number): Promise<IProduct[]>;

  findOne(data: GetProductDTO): Promise<IProduct>;

  insertProduct(data: IProduct): Promise<void>;

  updateOne(data: UpdateProductDTO): Promise<IProduct>;

  delete(data: DeleteProductDTO): Promise<string>;

  insertHist(data: IHist): Promise<void>;

  findLastSync(): Promise<IHist | null>;

  findUser(data: string): Promise<IUser>;

  updateUser(data: IUser): Promise<void | null>;
}
