import mongoose from 'mongoose';
import { IHist } from '../interfaces/IHist';
import { unixNow } from '../utils/unixNow';

const historySchema = new mongoose.Schema<IHist>({
  productsImported: { type: Number, default: 0 },
  dateStart: { type: Number, default: unixNow() },
  dateEnd: Number,
  files: [String],
});

export { historySchema };
