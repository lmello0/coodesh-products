import { UpdateProductDTO } from '../dtos/UpdateProductDTO';
import { MongoRepositoryProtocol } from '../repositories/MongoRepositoryProtocol';

export class UpdateProductService {
  constructor(private readonly db: MongoRepositoryProtocol) {}

  async execute(code: string, data: UpdateProductDTO) {
    data.code = code;

    return await this.db.updateOne(data);
  }
}
