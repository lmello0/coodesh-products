import { DeleteProductDTO } from '../dtos/DeleteProductDTO';
import { MongoRepositoryProtocol } from '../repositories/MongoRepositoryProtocol';

export class DeleteProductService {
  constructor(private readonly db: MongoRepositoryProtocol) {}

  async execute(data: DeleteProductDTO) {
    return await this.db.delete(data);
  }
}
