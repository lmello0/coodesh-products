import { Request, Response } from 'express';
import { GetProductsService } from '../services/GetProductsService';
import { NotFoundException } from '../exceptions/NotFoundException';
import { GetProductService } from '../services/GetProductService';
import { DeleteProductService } from '../services/DeleteProductService';
import { UpdateProductService } from '../services/UpdateProductService';

export class ProductController {
  constructor(
    private readonly getProductsService: GetProductsService,
    private readonly getProductService: GetProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
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
      const data = await this.getProductsService.execute();

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

      const data = await this.getProductService.execute({ code });

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

      return res.json(data);
    } catch (err) {
      this.handleException(err, res);
    }
  }
}
