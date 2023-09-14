import { IProduct } from '../interfaces/IProduct';
import { Product } from '../models/Product';
import { MongoRepositoryProtocol } from './MongoRepositoryProtocol';

export class MongoRepository implements MongoRepositoryProtocol {
  async findAll(): Promise<IProduct[]> {
    const products = await Product.find().select('-_id');

    return products;
  }
}
