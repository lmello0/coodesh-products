import { MongoRepository } from '../repositories/MongoRepository';
import { DeleteProductService } from '../services/DeleteProductService';
import { GetProductService } from '../services/GetProductService';
import { GetProductsService } from '../services/GetProductsService';
import { ProductController } from './productController';

const mongoRepository = new MongoRepository();

const getProductsService = new GetProductsService(mongoRepository);
const getProductService = new GetProductService(mongoRepository);
const deleteProductService = new DeleteProductService(mongoRepository);

const productController = new ProductController(
  getProductsService,
  getProductService,
  deleteProductService,
);

export { productController };
