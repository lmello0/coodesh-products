import mongoose from 'mongoose';
import { connectionStatus } from '../services/GetStatusService';

const dbUser = process.env.MONGODB_USER || '';
const dbPassword = process.env.MONGODB_PASSWORD || '';

let dbURL = process.env.MONGODB_URL || '';

dbURL = dbURL.replace('<user>', dbUser);
dbURL = dbURL.replace('<password>', dbPassword);

mongoose.connection.on('error', (err) => {
  console.error(err);
  connectionStatus.mongoStatus = 'Offline';
});

mongoose.connection.on('open', () => {
  console.log('Connected to MongoDB');
  connectionStatus.mongoStatus = 'Online';
});

mongoose.set('debug', process.env.NODE_ENV === 'development');

export { dbURL };
