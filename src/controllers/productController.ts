import { Request, Response } from 'express';
import { GetProductsService } from '../services/GetProductsService';

export class ProductController {
  constructor(private readonly getProductsService: GetProductsService) {}

  async getProducts(req: Request, res: Response) {
    try {
      const data = await this.getProductsService.execute();

      return res.json(data);
    } catch (err) {
      return res.status(500).send('Unexpected error');
    }
  }

  async getProduct(req: Request, res: Response) {
    return res.send('WIP');
  }

  async updateProduct(req: Request, res: Response) {
    return res.send('WIP');
  }

  async deleteProduct(req: Request, res: Response) {
    return res.send('WIP');
  }
}
