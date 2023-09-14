import { MongoRepository } from '../repositories/MongoRepository';
import { GetProductService } from '../services/GetProductService';
import { GetProductsService } from '../services/GetProductsService';
import { ProductController } from './productController';

const mongoRepository = new MongoRepository();

const getProductsService = new GetProductsService(mongoRepository);
const getProductService = new GetProductService(mongoRepository);

const productController = new ProductController(
  getProductsService,
  getProductService,
);

export { productController };
