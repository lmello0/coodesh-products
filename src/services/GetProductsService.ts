import { MongoRepositoryProtocol } from '../repositories/MongoRepositoryProtocol';

export class GetProductsService {
  constructor(private readonly db: MongoRepositoryProtocol) {}

  async execute() {
    return await this.db.findAll();
  }
}
