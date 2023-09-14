import { model } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';
import { productSchema } from '../schemas/productSchema';

const Product = model<IProduct>('Product', productSchema);

export { Product };
