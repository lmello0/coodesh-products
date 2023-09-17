import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { MongoRepositoryProtocol } from '../repositories/MongoRepositoryProtocol';

export class UpdateUserService {
  constructor(private readonly db: MongoRepositoryProtocol) {}

  async execute(data: UpdateUserDTO): Promise<void> {
    await this.db.updateUser(data);
  }
}
