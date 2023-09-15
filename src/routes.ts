import { Request, Response, Router } from 'express';
import { productController, statusController } from './controllers';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return statusController.getStatus(req, res);
});

router.get('/products', (req: Request, res: Response) => {
  return productController.getProducts(req, res);
});

router.get('/products/:code', (req: Request, res: Response) => {
  return productController.getProduct(req, res);
});

router.put('/products/:code', (req: Request, res: Response) => {
  return productController.updateProduct(req, res);
});

router.delete('/products/:code', (req: Request, res: Response) => {
  return productController.deleteProduct(req, res);
});

export { router };
