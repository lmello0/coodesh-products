import { Duration } from 'luxon';
import { redis } from '../db/redis';
import { IProduct } from '../interfaces/IProduct';
import { RedisRepositoryProtocol } from './RedisRepositoryProtocol';
import { GetProductsDTO } from '../dtos/GetProductsDTO';

export class RedisRepository implements RedisRepositoryProtocol {
  async get(key: string): Promise<void | IProduct | IProduct[]> {
    const data = (await redis.json.get(key)) as string;

    return JSON.parse(data);
  }

  store(key: string, data: object): void {
    redis.json.set(key, '.', JSON.stringify(data));

    redis.expire(key, Duration.fromObject({ hour: 1 }).as('seconds'));
  }

  delete(key: string) {
    redis.json.del(key);
  }

  private async updateMatchingKeys(
    code: string,
    data?: IProduct,
  ): Promise<void> {
    const updateCachedData = async (key: string) => {
      const cachedData = (await this.get(key)) as unknown as GetProductsDTO;

      if (data) {
        cachedData.products = cachedData.products.map((product) => {
          if (product.code === code) {
            return data;
          }

          return product;
        });
      } else {
        const index = cachedData.products.findIndex(
          (product) => product.code === code,
        );

        cachedData.products.splice(index, 1);
      }

      this.store(key, cachedData);
    };

    const matchingKeys = (await redis.scan(0, { MATCH: '/products:*' })).keys;

    await Promise.all(matchingKeys.map(updateCachedData));
  }

  private async updateSpecificProductKey(
    code: string,
    data?: IProduct,
  ): Promise<void> {
    const specificProductKey = `/products/${code}`;

    if (data) {
      this.store(specificProductKey, data);
      return;
    }

    this.delete(specificProductKey);
  }

  updateCache(code: string, data?: IProduct): void {
    this.updateMatchingKeys(code, data);
    this.updateSpecificProductKey(code, data);
  }
}
