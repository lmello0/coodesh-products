import mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema = new mongoose.Schema<IUser>({
  email: String,
  password: String,
  apiKey: String,
  usageQuota: [Object],
});

export { userSchema };
