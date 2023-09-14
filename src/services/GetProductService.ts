import { GetProductDTO } from '../dtos/GetProductDTO';
import { MongoRepositoryProtocol } from '../repositories/MongoRepositoryProtocol';

export class GetProductService {
  constructor(private readonly db: MongoRepositoryProtocol) {}

  async execute(data: GetProductDTO) {
    return await this.db.findOne(data);
  }
}
