export interface IProduct {
  code: number;
  status: string;
  importedT: Date;
  url: string;
  creator: string;
  createdT: Date;
  lastModifiedT: Date;
  productName: string;
  quantity: string;
  brands: string[];
  categories: string[];
  labels: string[];
  cities: string[];
  purchase_places: string[];
  stores: string[];
  ingredients_text: string[];
  traces: string[];
  servingSize: string;
  servingQuantity: number;
  nutriscoreScore: number;
  nutriscoreGrade: string;
  mainCategory: string;
  imageUrl: string;
}
