import { NotFoundException } from '../exceptions/NotFoundException';
import { IUser } from '../interfaces/IUser';
import { MongoRepositoryProtocol } from '../repositories/MongoRepositoryProtocol';

export class GetUserService {
  constructor(private readonly db: MongoRepositoryProtocol) {}

  async execute(apiKey: string): Promise<IUser> {
    const user = await this.db.findUser(apiKey);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
