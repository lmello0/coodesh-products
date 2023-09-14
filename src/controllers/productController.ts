import { Request, Response } from 'express';
import { GetProductsService } from '../services/GetProductsService';
import { NotFoundException } from '../exceptions/NotFoundException';
import { GetProductService } from '../services/GetProductService';
import { DeleteProductService } from '../services/DeleteProductService';
import { UpdateProductService } from '../services/UpdateProductService';
import { getErrors } from '../utils/getErrors';
import { RedisRepositoryProtocol } from '../repositories/RedisRepositoryProtocol';

export class ProductController {
  constructor(
    private readonly getProductsService: GetProductsService,
    private readonly getProductService: GetProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
    private readonly cache: RedisRepositoryProtocol,
  ) {}

  private handleException(err: unknown, res: Response) {
    if (err instanceof NotFoundException) {
      return res.status(404).json({ error: err.message });
    } else {
      console.error(err);

      return res.status(500).json({ error: 'Unexpected error' });
    }
  }

  async getProducts(req: Request, res: Response) {
    try {
      const key = req.originalUrl;
      const cachedData = await this.cache.get(key);

      if (cachedData) {
        return res.json(cachedData);
      }

      const data = await this.getProductsService.execute();

      this.cache.store(key, data);

      return res.json(data);
    } catch (err) {
      this.handleException(err, res);
    }
  }

  async getProduct(req: Request, res: Response) {
    try {
      const { code } = req.params;

      if (!code) {
        return res.status(400).send('No code provided!');
      }

      const key = req.originalUrl;
      const cachedData = await this.cache.get(key);

      if (cachedData) {
        return res.json(cachedData);
      }

      const data = await this.getProductService.execute({ code });

      this.cache.store(key, data);

      return res.json(data);
    } catch (err) {
      this.handleException(err, res);
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const { code } = req.params;
      const data = req.body;

      if (!code) {
        return res.status(400).send('No code provided!');
      }

      const errors = getErrors(data);

      if (errors) {
        return res.status(400).json(
          errors.map((error) => {
            return { error };
          }),
        );
      }

      const newData = await this.updateProductService.execute(code, data);

      return res.json(newData);
    } catch (err) {
      this.handleException(err, res);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { code } = req.params;

      if (!code) {
        return res.status(400).send('No code provided');
      }

      const data = await this.deleteProductService.execute({ code });

      return res.json({ status: data });
    } catch (err) {
      this.handleException(err, res);
    }
  }
}
