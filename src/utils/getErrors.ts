import Joi from 'joi';
import { IProduct } from '../interfaces/IProduct';

const updateSchema = Joi.object<Partial<IProduct>>({
  status: Joi.string().valid('draft', 'published'),
  url: Joi.string().uri(),
  product_name: Joi.string(),
  quantity: Joi.string(),
  brands: Joi.string(),
  categories: Joi.string(),
  labels: Joi.string(),
  cities: Joi.string(),
  purchase_places: Joi.string(),
  stores: Joi.string(),
  ingredients_text: Joi.string(),
  traces: Joi.string(),
  serving_size: Joi.string(),
  serving_quantity: Joi.number(),
  nutriscore_score: Joi.number(),
  nutriscore_grade: Joi.string(),
  main_category: Joi.string(),
  image_url: Joi.string().uri(),
});

export function getErrors(data: object): void | string[] {
  const { error } = updateSchema.validate(data, { abortEarly: false });

  return error?.message.replace(/"/g, "'").split(/\. /g);
}
