import { GetProductsDTO } from '../dtos/GetProductsDTO';
import { MongoRepositoryProtocol } from '../repositories/MongoRepositoryProtocol';

export class GetProductsService {
  constructor(private readonly db: MongoRepositoryProtocol) {}

  async execute(page: number, limit: number): Promise<GetProductsDTO> {
    const products = await this.db.findAll(page, limit);
    const hasNext = products.length >= limit;

    return { hasNext, products };
  }
}
