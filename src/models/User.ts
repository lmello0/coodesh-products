import { model } from 'mongoose';
import { IUser } from '../interfaces/IUser';
import { userSchema } from '../schemas/userSchema';

const User = model<IUser>('User', userSchema, 'users');

export { User };
