import { MongoRepository } from '../repositories/MongoRepository';
import { GetProductsService } from '../services/GetProductsService';
import { ProductController } from './productController';

const mongoRepository = new MongoRepository();

const getProductsService = new GetProductsService(mongoRepository);

const productController = new ProductController(getProductsService);

export { productController };
