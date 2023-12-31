import { DeleteProductDTO } from '../dtos/DeleteProductDTO';
import { GetProductDTO } from '../dtos/GetProductDTO';
import { UpdateProductDTO } from '../dtos/UpdateProductDTO';
import { NotFoundException } from '../exceptions/NotFoundException';
import { IHist } from '../interfaces/IHist';
import { IProduct } from '../interfaces/IProduct';
import { IUser } from '../interfaces/IUser';
import { History } from '../models/History';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { MongoRepositoryProtocol } from './MongoRepositoryProtocol';

export class MongoRepository implements MongoRepositoryProtocol {
  async findAll(page: number, limit: number): Promise<IProduct[]> {
    const products = await Product.find({ $nor: [{ status: 'trash' }] })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-_id');

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

  async updateOne(data: UpdateProductDTO): Promise<IProduct> {
    const product = await Product.findOneAndUpdate(
      {
        code: data.code,
        $nor: [{ status: 'trash' }],
      },
      data,
      { new: true },
    ).select('-_id');

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

  async insertProduct(data: object): Promise<void> {
    await new Product(data).save();
  }

  async insertHist(data: IHist): Promise<void> {
    await new History(data).save();
  }

  async findLastSync(): Promise<IHist | null> {
    return await History.findOne({}, {}, { sort: { created_at: -1 } });
  }

  async findUser(data: string): Promise<IUser> {
    return await User.findOne({ apiKey: data }).select('-_id');
  }

  async updateUser(data: IUser): Promise<void | null> {
    return await User.findOneAndUpdate({ apiKey: data.apiKey }, data);
  }
}
