import { model } from 'mongoose';
import { IHist } from '../interfaces/IHist';
import { historySchema } from '../schemas/historySchema';

const History = model<IHist>('History', historySchema, 'history');

export { History };
