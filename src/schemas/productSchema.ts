import mongoose from 'mongoose';
import { IProduct } from '../interfaces/IProduct';
import { unixNow } from '../utils/unixNow';

const productSchema = new mongoose.Schema<IProduct>({
  code: String,
  status: { type: String, default: 'published' },
  imported_t: { type: Date, default: unixNow() },
  url: String,
  creator: String,
  created_t: Date,
  last_modified_t: Date,
  product_name: String,
  quantity: String,
  brands: String,
  categories: String,
  labels: String,
  cities: String,
  purchase_places: String,
  stores: String,
  ingredients_text: String,
  traces: String,
  serving_size: String,
  serving_quantity: Number,
  nutriscore_score: Number,
  nutriscore_grade: String,
  main_category: String,
  image_url: String,
});

export { productSchema };
