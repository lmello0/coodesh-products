import { GetProductDTO } from '../dtos/GetProductDTO';
import { NotFoundException } from '../exceptions/NotFoundException';
import { IProduct } from '../interfaces/IProduct';
import { Product } from '../models/Product';
import { MongoRepositoryProtocol } from './MongoRepositoryProtocol';

export class MongoRepository implements MongoRepositoryProtocol {
  async findAll(): Promise<IProduct[]> {
    const products = await Product.find().select('-_id');

    return products;
  }

  async findOne(data: GetProductDTO): Promise<IProduct> {
    const product = await Product.findOne({ code: data.code }).select('-_id');

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
