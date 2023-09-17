import { MongoRepository } from '../repositories/MongoRepository';
import { RedisRepository } from '../repositories/RedisRepository';
import { DeleteProductService } from '../services/DeleteProductService';
import { GetProductService } from '../services/GetProductService';
import { GetProductsService } from '../services/GetProductsService';
import { GetStatusService } from '../services/GetStatusService';
import { UpdateProductService } from '../services/UpdateProductService';
import { ProductController } from './productController';
import { StatusController } from './statusController';

const mongoRepository = new MongoRepository();
const redisRepository = new RedisRepository();

const getProductsService = new GetProductsService(mongoRepository);
const getProductService = new GetProductService(mongoRepository);
const updateProductService = new UpdateProductService(mongoRepository);
const deleteProductService = new DeleteProductService(mongoRepository);

const productController = new ProductController(
  getProductsService,
  getProductService,
  updateProductService,
  deleteProductService,
  redisRepository,
);

const getStatusService = new GetStatusService(mongoRepository);

const statusController = new StatusController(getStatusService);

export { productController, statusController };
