import mongoose from 'mongoose';
import { IProduct } from '../interfaces/IProduct';

const productSchema = new mongoose.Schema<IProduct>({
  code: String,
  status: String,
  importedT: Date,
  url: String,
  creator: String,
  createdT: Date,
  lastModifiedT: Date,
  productName: String,
  quantity: String,
  brands: [String],
  categories: [String],
  labels: [String],
  cities: [String],
  purchase_places: [String],
  stores: [String],
  ingredients_text: [String],
  traces: [String],
  servingSize: String,
  servingQuantity: Number,
  nutriscoreScore: Number,
  nutriscoreGrade: String,
  mainCategory: String,
  imageUrl: String,
});

export { productSchema };
