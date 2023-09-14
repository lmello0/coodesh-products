import { DeleteProductDTO } from '../dtos/DeleteProductDTO';
import { GetProductDTO } from '../dtos/GetProductDTO';
import { NotFoundException } from '../exceptions/NotFoundException';
import { IProduct } from '../interfaces/IProduct';
import { Product } from '../models/Product';
import { MongoRepositoryProtocol } from './MongoRepositoryProtocol';

export class MongoRepository implements MongoRepositoryProtocol {
  async findAll(): Promise<IProduct[]> {
    const products = await Product.find({ $nor: [{ status: 'trash' }] }).select(
      '-_id',
    );

    return products;
  }

  async findOne(data: GetProductDTO): Promise<IProduct> {
    const product = await Product.findOne({
      code: data.code,
      $nor: [{ status: 'trash' }],
    }).select('-_id');

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async delete(data: DeleteProductDTO): Promise<string> {
    const product = await Product.findOneAndUpdate(
      {
        code: data.code,
        $nor: [{ status: 'trash' }],
      },
      { status: 'trash' },
    );

    if (!product) {
      throw new NotFoundException();
    }

    return `${data.code} deleted`;
  }
}
